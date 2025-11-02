import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cityId } = await request.json()

    if (!cityId) {
      return NextResponse.json({ error: 'City ID required' }, { status: 400 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    const destinationCity = await prisma.city.findUnique({
      where: { id: cityId }
    })

    if (!destinationCity) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    if (character.cityId === cityId) {
      return NextResponse.json(
        { error: 'You are already in this city' },
        { status: 400 }
      )
    }

    const isDifferentCountry = character.city?.country !== destinationCity.country
    const baseCost = isDifferentCountry ? 5000 : 1000
    const travelCost = baseCost

    const currentCash = Number(character.cash)
    if (currentCash < travelCost) {
      return NextResponse.json(
        {
          error: `Not enough money. Travel costs $${travelCost.toLocaleString()}`,
          cost: travelCost,
          currentMoney: currentCash
        },
        { status: 403 }
      )
    }

    const energyCost = isDifferentCountry ? 50 : 25
    if (character.energy < energyCost) {
      return NextResponse.json(
        { 
          error: `Not enough energy. Travel requires ${energyCost} energy`,
          cost: energyCost,
          currentEnergy: character.energy
        },
        { status: 403 }
      )
    }

    const updatedCharacter = await prisma.character.update({
      where: { userId: user.id },
      data: {
        cityId,
        cash: currentCash - travelCost,
        energy: character.energy - energyCost
      },
      include: { city: true }
    })

    // Get username for event
    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Player'

    await prisma.gameEvent.create({
      data: {
        type: 'travel',
        message: `${username} traveled from ${character.city?.name || 'Unknown'} to ${destinationCity.name}`,
        userId: user.id,
        username: username
      }
    })

    return NextResponse.json({ 
      message: `Successfully traveled to ${destinationCity.name}`,
      character: updatedCharacter,
      cost: travelCost
    })
  } catch (error) {
    console.error('❌ POST /api/travel error:', error)
    return NextResponse.json(
      { error: 'Failed to travel' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const character = await prisma.character.findUnique({
      where: { userId: user.id },
      include: { city: true }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    const cities = await prisma.city.findMany({
      orderBy: [
        { country: 'asc' },
        { name: 'asc' }
      ]
    })

    const citiesByCountry: Record<string, any[]> = {}

    cities.forEach(city => {
      const isDifferentCountry = character.city?.country !== city.country
      const isCurrentCity = character.cityId === city.id

      const canTravel = !isCurrentCity
      const blockedReason = isCurrentCity ? 'Current Location' : ''

      const baseCost = isDifferentCountry ? 5000 : 1000
      const travelCost = baseCost
      const energyCost = isDifferentCountry ? 50 : 25

      const cityInfo = {
        ...city,
        isCurrentCity,
        isDifferentCountry,
        canTravel,
        blockedReason,
        travelCost,
        energyCost
      }

      if (!citiesByCountry[city.country]) {
        citiesByCountry[city.country] = []
      }
      citiesByCountry[city.country].push(cityInfo)
    })

    return NextResponse.json({
      citiesByCountry,
      currentCity: character.city,
      characterLevel: character.level
    })
  } catch (error) {
    console.error('❌ GET /api/travel error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    )
  }
}