import { NextRequest, NextResponse } from 'next/server';
import { broadcastUpdate } from '@/lib/events';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Broadcast the fresh data to all open SSE streams
    broadcastUpdate(data);
    
    return NextResponse.json({ 
      status: 'pushed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
