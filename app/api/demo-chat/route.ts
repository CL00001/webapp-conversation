import { NextResponse } from 'next/server'

type DifyChatResponse = {
  answer?: string
  conversation_id?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const { query, conversationId } = await request.json()

    if (typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'A message is required.' },
        { status: 400 },
      )
    }

    const apiUrl = process.env.DIFY_API_URL?.replace(/\/+$/, '')
    const apiKey = process.env.DIFY_API_KEY

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: 'Dify environment variables are missing.' },
        { status: 500 },
      )
    }

    const response = await fetch(`${apiUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: query.trim(),
        response_mode: 'blocking',
        conversation_id:
          typeof conversationId === 'string' ? conversationId : '',
        user: 'vercel-demo-user',
      }),
      cache: 'no-store',
    })

    const data = (await response.json()) as DifyChatResponse

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Dify rejected the request.' },
        { status: response.status },
      )
    }

    return NextResponse.json({
      answer: data.answer || '',
      conversationId: data.conversation_id || conversationId || '',
    })
  }
  catch (error) {
    console.error('Demo chat request failed:', error)

    return NextResponse.json(
      { error: 'Unable to connect to Dify.' },
      { status: 500 },
    )
  }
}
