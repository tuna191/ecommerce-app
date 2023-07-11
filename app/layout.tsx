import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProviers from '@/providers/modal-providers'
import { ToasterProvider } from '@/providers/toast-provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin dashboard',
  description: 'admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
      <ToasterProvider/>
      <ModalProviers/>
        
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
