import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import PageTransition from '@/components/PageTransition'
import AmbientBackground from '@/components/AmbientBackground'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'JU. | Systems That Work',
    template: '%s | JU.',
  },
  description:
    'Julius Williams builds custom websites and AI systems for businesses that want to stop guessing and start operating. Based in Grass Valley, CA.',
  metadataBase: new URL('https://buildwithju.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'JU.',
    title: 'JU. | Systems That Work',
    description:
      'Custom websites and AI systems. Built from scratch. Running 24/7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JU. | Systems That Work',
    description:
      'Custom websites and AI systems. Built from scratch. Running 24/7.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <AmbientBackground />
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <main className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  )
}
