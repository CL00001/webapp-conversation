'use client'

import type { FC } from 'react'
import React from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'

const Demo2App: FC<IMainProps> = ({
  params,
}: any) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <style jsx global>{`
        .demo2-main > div {
          height: 100% !important;
          min-height: 0 !important;
        }
      `}</style>

      <div className="demo2-main min-h-0 flex-1 overflow-hidden">
        <Main params={params} />
      </div>

      <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-500">
        AI may make mistakes. Please contact CPCE Academic Registry if any questions.
      </footer>
    </div>
  )
}

export default React.memo(Demo2App)
