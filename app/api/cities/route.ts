import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET() {
  try {
    // Cities should be public for registration/character creation
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ cities });
  } catch (error) {
    console.error('❌ GET /api/cities error:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}