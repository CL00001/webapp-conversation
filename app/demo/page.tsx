'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'

const suggestions = [
  'What are the admission requirements?',
  'How do I apply?',
  'What programmes are available?',
]

type ChatMessage = {
  role: 'assistant' | 'user'
  text: string
}

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    text: 'Hello! I am the CPCE Admission Chatbot. How can I help with your application today?',
  },
]

export default function WidgetDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  const sendMessage = async (message: string) => {
    const query = message.trim()

    if (!query || isSending)
      return

    setMessages(current => [
      ...current,
      { role: 'user', text: query },
    ])
    setInput('')
    setIsSending(true)

    try {
      const response = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          conversationId,
        }),
      })

      const data = await response.json()

      if (!response.ok)
        throw new Error(data.error || 'The chatbot request failed.')

      setMessages(current => [
        ...current,
        {
          role: 'assistant',
          text: data.answer || 'Dify returned an empty response.',
        },
      ])

      if (data.conversationId)
        setConversationId(data.conversationId)
    }
    catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Unable to connect to the chatbot.'

      setMessages(current => [
        ...current,
        {
          role: 'assistant',
          text: `Sorry, I could not complete that request. ${message}`,
        },
      ])
    }
    finally {
      setIsSending(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage(input)
  }

  return (
    <main className="min-h-screen bg-[#f8f5f6] px-5 py-10 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1fr_420px]">
        <section className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b1538]/15 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1538] shadow-sm">
            Vercel UI demo
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            A custom admission chatbot, styled for CPCE.
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            This custom interface is hosted by Vercel while your existing
            Dify application securely generates the answers.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              Custom colours
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              Bold title
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              Connected to Dify
            </span>
          </div>

          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8b1538] underline decoration-[#8b1538]/30 underline-offset-4"
          >
            Return to the current chatbot
            <span aria-hidden="true">→</span>
          </a>
        </section>

        <section
          aria-label="Admission chatbot widget"
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_28px_80px_rgba(44,14,25,0.20)]">
            <header className="bg-[#8b1538] px-6 py-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v6.5A2.75 2.75 0 0 1 17.25 16H11l-4.8 3.6V16A2.74 2.74 0 0 1 4 13.31V6.75Z" />
                      <path d="M8 9.5h8M8 12.5h5" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-base font-bold leading-6">
                      Admission Chatbot (Test)
                    </h2>
                    <p className="mt-0.5 text-xs text-white/75">
                      CPCE Admissions · Online
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Minimise chatbot"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl text-white/90"
                >
                  −
                </button>
              </div>
            </header>

            <div className="h-[430px] overflow-y-auto bg-[#fbfafb] px-5 py-6">
              <div className="space-y-5">
                {messages.map((message, index) => (
                  message.role === 'assistant'
                    ? (
                        <div key={`${message.role}-${index}`} className="flex gap-3">
                          <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8b1538] text-xs font-bold text-white">
                            A
                          </div>
                          <div className="max-w-[290px] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200/70">
                            {message.text}
                          </div>
                        </div>
                      )
                    : (
                        <div key={`${message.role}-${index}`} className="flex justify-end">
                          <div className="max-w-[265px] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-[#8b1538] px-4 py-3 text-sm leading-6 text-white shadow-sm">
                            {message.text}
                          </div>
                        </div>
                      )
                ))}

                {isSending && (
                  <div className="flex gap-3">
                    <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8b1538] text-xs font-bold text-white">
                      A
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm text-slate-500 shadow-sm ring-1 ring-slate-200/70">
                      Thinking…
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Suggested questions
                  </p>

                  <div className="space-y-2">
                    {suggestions.map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        disabled={isSending}
                        onClick={() => void sendMessage(suggestion)}
                        className="w-full rounded-xl border border-[#8b1538]/15 bg-white px-4 py-3 text-left text-sm font-medium text-[#74112f] shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <footer className="border-t border-slate-200 bg-white p-4">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-2xl bg-slate-100 p-2 pl-4 ring-1 ring-slate-200"
              >
                <input
                  aria-label="Message"
                  placeholder="Ask about admissions..."
                  value={input}
                  disabled={isSending}
                  onChange={event => setInput(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={isSending || !input.trim()}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#8b1538] text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="m5 12 14-7-4 14-3-6-7-1Z" />
                    <path d="m12 13 7-8" />
                  </svg>
                </button>
              </form>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                Connected securely to Dify through Vercel
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  )
}
