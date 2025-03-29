import { articles } from '@/app/data/articles';
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a delay to mimic real API behavior
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(articles);
}