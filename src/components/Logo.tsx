import { Link } from '@tanstack/react-router'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`font-display text-xl font-black uppercase leading-none tracking-[-0.04em] md:text-2xl ${className}`} aria-label="NOVA THREADS home">
      Nova<span className="font-serif text-[1.08em] font-normal italic tracking-normal normal-case">threads</span>
    </Link>
  )
}
