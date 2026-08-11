import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}
