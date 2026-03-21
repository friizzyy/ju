import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative px-6 pt-24 pb-24 sm:pb-10 border-t border-white/[0.03] z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
          <div>
            <p className="text-3xl font-bold tracking-[-0.03em] mb-3">JU.</p>
            <p className="text-xs text-muted/40 leading-relaxed max-w-[200px]">Custom websites and AI systems. Built to run while you sleep.</p>
            <p className="font-mono text-[10px] text-muted/20 mt-4 tracking-wider">SAN FRANCISCO, CA</p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-studio/40 mb-4">JU. Studio</p>
            <div className="space-y-2">
              {['Portfolio', 'Pricing', 'Start a project'].map(item => (
                <div key={item}><Link href="/studio" className="text-sm text-muted/40 hover:text-foreground transition-colors duration-300">{item}</Link></div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-zeus/40 mb-4">JU. Systems</p>
            <div className="space-y-2">
              {['How it works', 'Packages', 'Book a call'].map(item => (
                <div key={item}><Link href="/systems" className="text-sm text-muted/40 hover:text-foreground transition-colors duration-300">{item}</Link></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.03]">
          <p className="font-mono text-[10px] text-muted/20 tracking-wider">&copy; {new Date().getFullYear()} JU. ALL RIGHTS RESERVED</p>
          <a href="mailto:julius@buildwithju.com" className="font-mono text-[10px] text-muted/20 hover:text-foreground transition-colors tracking-wider">JULIUS@BUILDWITHJU.COM</a>
        </div>
      </div>
    </footer>
  )
}
