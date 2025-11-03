import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get character
    const character = await prisma.character.findUnique({
      where: { userId: user.id }
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // If character already has a city, no need to fix
    if (character.cityId) {
      return NextResponse.json({
        message: 'Character already has a city',
        character
      });
    }

    // Get first city (Los Santos)
    const city = await prisma.city.findFirst({
      where: { name: 'Los Santos' }
    });

    if (!city) {
      return NextResponse.json({ error: 'No cities available' }, { status: 500 });
    }

    // Update character with city
    const updatedCharacter = await prisma.character.update({
      where: { userId: user.id },
      data: { cityId: city.id },
      include: { city: true }
    });

    console.log('✅ Character fixed! Assigned city:', city.name);
    return NextResponse.json({
      message: 'Character fixed successfully',
      character: updatedCharacter
    });
  } catch (error) {
    console.error('❌ Fix character error:', error);
    return NextResponse.json(
      { error: 'Failed to fix character' },
      { status: 500 }
    );
  }
}
