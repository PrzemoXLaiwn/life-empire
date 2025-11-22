import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET() {
  try {
    // Allow unauthenticated access for registration flow
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
    });

    console.log('✅ GET /api/cities - Found cities:', cities.length);
    cities.forEach(city => {
      console.log(`  - ${city.name} (${city.country})`);
    });

    return NextResponse.json({ cities });
  } catch (error) {
    console.error('❌ GET /api/cities error:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}
