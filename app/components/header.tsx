'use client'

import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'

import AppIcon from '@/app/components/base/app-icon'

export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  const pathname = usePathname()
  const isDemo2 = pathname.startsWith('/demo2')

  return (
    <div
      className={`shrink-0 flex items-center justify-between h-12 px-3 ${
        isDemo2 ? 'bg-[#8b1538]' : 'bg-gray-100'
      }`}
    >
      {isMobile
        ? (
          <div
            className="flex items-center justify-center h-8 w-8 cursor-pointer"
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon
              className={`h-4 w-4 ${
                isDemo2 ? 'text-white' : 'text-gray-500'
              }`}
            />
          </div>
        )
        : <div></div>}

      <div className="flex items-center space-x-2">
        <AppIcon size="small" />
        <div
          className={`text-sm ${
            isDemo2
              ? 'text-white font-extrabold'
              : 'text-gray-800 font-bold'
          }`}
        >
          {title}
        </div>
      </div>

      {isMobile
        ? (
          <div
            className="flex items-center justify-center h-8 w-8 cursor-pointer"
            onClick={() => onCreateNewChat?.()}
          >
            <PencilSquareIcon
              className={`h-4 w-4 ${
                isDemo2 ? 'text-white' : 'text-gray-500'
              }`}
            />
          </div>
        )
        : <div></div>}
    </div>
  )
}

export default React.memo(Header)
