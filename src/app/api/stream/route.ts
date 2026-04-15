import { NextRequest } from 'next/server';
import { subscribeToUpdates, IOT_EVENT } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Connect to our internal "broadcast" system
      const unsubscribe = subscribeToUpdates((data) => {
        try {
          const message = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (e) {
          console.error('Streaming error:', e);
        }
      });

      // Close the connection if the user closes the tab
      req.signal.onabort = () => {
        unsubscribe();
        controller.close();
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
