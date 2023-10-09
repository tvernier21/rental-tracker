// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import ToasterProvider from './ToasterProvider'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToasterProvider />
      {children}
    </NextUIProvider>
  )
}