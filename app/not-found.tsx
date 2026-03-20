import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-sm text-accent/50 mb-4">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted text-sm mb-8 max-w-sm mx-auto">
          Whatever you were looking for isn&apos;t here.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-accent text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
