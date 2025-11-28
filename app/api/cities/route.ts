import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('🔵 GET /api/cities - Start');
  
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
    });

    console.log('✅ GET /api/cities - Found cities:', cities.length);
    return NextResponse.json({ cities });
  } catch (error) {
    console.error('❌ GET /api/cities error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch cities',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}