import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'
import AmbientBackground from '@/components/AmbientBackground'
import Footer from '@/components/Footer'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'JU. | Systems That Work',
    template: '%s | JU.',
  },
  description:
    'Julius Williams builds custom websites and AI systems for businesses that want to stop guessing and start operating. Based in San Francisco, CA.',
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
        <ScrollToTop />
        <Navigation />
        <main className="relative z-10 pb-20 sm:pb-0 pt-16 sm:pt-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
