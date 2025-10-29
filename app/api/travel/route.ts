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

    if (character.level < destinationCity.minLevel) {
      return NextResponse.json(
        { 
          error: `You need to be level ${destinationCity.minLevel} to travel to ${destinationCity.name}`,
          requiredLevel: destinationCity.minLevel,
          currentLevel: character.level
        },
        { status: 403 }
      )
    }

    const isDifferentCountry = character.city?.country !== destinationCity.country

    if (isDifferentCountry && destinationCity.requiresPlane && !character.hasPlane) {
      return NextResponse.json(
        { 
          error: `You need a plane to travel to ${destinationCity.country}. Buy one in the Market!`,
          requiresPlane: true
        },
        { status: 403 }
      )
    }

    if (!isDifferentCountry && destinationCity.requiresCar) {
      if (!character.hasDriverLicense) {
        return NextResponse.json(
          { 
            error: `You need a driver's license to travel to ${destinationCity.name}`,
            requiresLicense: true
          },
          { status: 403 }
        )
      }

      if (!character.hasCar) {
        return NextResponse.json(
          { 
            error: `You need a car to travel to ${destinationCity.name}. Buy one in the Market!`,
            requiresCar: true
          },
          { status: 403 }
        )
      }
    }

    const baseCost = isDifferentCountry ? 5000 : 1000
    const levelMultiplier = destinationCity.minLevel
    const travelCost = baseCost * levelMultiplier

    if (character.money < travelCost) {
      return NextResponse.json(
        { 
          error: `Not enough money. Travel costs $${travelCost.toLocaleString()}`,
          cost: travelCost,
          currentMoney: character.money
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
        money: character.money - travelCost,
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
        { minLevel: 'asc' }
      ]
    })

    const citiesByCountry: Record<string, any[]> = {}

    cities.forEach(city => {
      const isDifferentCountry = character.city?.country !== city.country
      const isCurrentCity = character.cityId === city.id
      
      const meetsLevelReq = character.level >= city.minLevel
      const hasLicense = character.hasDriverLicense
      const hasCar = character.hasCar
      const hasPlane = character.hasPlane

      let canTravel = meetsLevelReq && !isCurrentCity
      let blockedReason = ''

      if (!meetsLevelReq) {
        canTravel = false
        blockedReason = `Requires Level ${city.minLevel}`
      } else if (isDifferentCountry && city.requiresPlane && !hasPlane) {
        canTravel = false
        blockedReason = 'Requires Plane'
      } else if (!isDifferentCountry && city.requiresCar && !hasCar) {
        canTravel = false
        blockedReason = 'Requires Car'
      } else if (!isDifferentCountry && city.requiresCar && !hasLicense) {
        canTravel = false
        blockedReason = "Requires Driver's License"
      }

      const baseCost = isDifferentCountry ? 5000 : 1000
      const travelCost = baseCost * city.minLevel
      const energyCost = isDifferentCountry ? 50 : 25

      const cityInfo = {
        ...city,
        isCurrentCity,
        isDifferentCountry,
        canTravel,
        blockedReason,
        travelCost,
        energyCost,
        requirements: {
          level: city.minLevel,
          car: city.requiresCar,
          plane: city.requiresPlane,
          license: city.requiresCar
        }
      }

      if (!citiesByCountry[city.country]) {
        citiesByCountry[city.country] = []
      }
      citiesByCountry[city.country].push(cityInfo)
    })

    return NextResponse.json({ 
      citiesByCountry,
      currentCity: character.city,
      characterLevel: character.level,
      hasDriverLicense: character.hasDriverLicense,
      hasCar: character.hasCar,
      hasPlane: character.hasPlane
    })
  } catch (error) {
    console.error('❌ GET /api/travel error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    )
  }
}