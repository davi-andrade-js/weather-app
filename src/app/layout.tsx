'use client'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <head>
        <title>Weather Whisperer</title>
        <link rel="icon" href="icon.png"></link>
      </head>
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  )
}
