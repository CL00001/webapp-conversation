import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  try {
    const { data } = await client.getApplicationParameters(user)
    return NextResponse.json(data as object, {
      headers: setSession(sessionId),
    })
  }
  catch (error: unknown) {
  const err = error as {
    response?: {
      status?: number
      data?: { code?: string; message?: string }
    }
  }

  const details = {
    error: 'Dify parameters request failed',
    upstreamStatus: err.response?.status ?? null,
    code: err.response?.data?.code ?? null,
    message:
      err.response?.data?.message ??
      'Unable to retrieve Dify application parameters',
  }

  const actualError = error as {
  name?: string
  message?: string
  code?: string
  cause?: { code?: string; message?: string }
}

console.error('[Dify parameters]', {
  ...details,
  name: actualError.name,
  actualMessage: actualError.message,
  errorCode: actualError.code,
  causeCode: actualError.cause?.code,
  causeMessage: actualError.cause?.message,
})

  return NextResponse.json(details, { status: 502 })
}
}
