import { articles } from '@/app/data/articles';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Check if there's a custom endpoint in localStorage
    const customEndpoint = request.headers.get('X-Articles-Api-Endpoint');
    
    if (customEndpoint) {
      const response = await fetch(customEndpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch from custom endpoint');
      }
      const data = await response.json();
      return NextResponse.json(data);
    }
    
    // Simulate a delay to mimic real API behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(articles); // Fallback to default articles
  }
}