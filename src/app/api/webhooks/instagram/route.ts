'use server';

import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the verification request from Meta to set up a webhook.
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.NEXT_PUBLIC_INSTAGRAM_VERIFY_TOKEN;

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === verifyToken) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      return new NextResponse(challenge, { status: 200 });
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      console.error('Webhook verification failed: Tokens do not match.');
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Respond with '400 Bad Request' if mode or token are missing
  console.error('Webhook verification failed: Mode or token missing.');
  return new NextResponse('Bad Request', { status: 400 });
}

/**
 * Handles incoming webhook notifications from Meta.
 * For now, it just acknowledges receipt of the data.
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started#event-notifications
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Received webhook:', JSON.stringify(body, null, 2));
        
        // You will process the webhook payload here later.
        // For example, if it's a new comment, you might trigger an AI response.

        // Instagram requires a 200 OK response to acknowledge receipt.
        return new NextResponse('EVENT_RECEIVED', { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
