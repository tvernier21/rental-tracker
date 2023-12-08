// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import ToasterProvider from './ToasterProvider'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background" style={{color: '#ffffff'}}>
        <ToasterProvider />
        {children}
      </main>
    </NextUIProvider>
  )
}