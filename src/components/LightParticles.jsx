import { memo } from 'react';

// Lightweight CSS-based particle alternative
const LightParticles = memo(({ count = 15, className = "" }) => {
  const particles = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse ${className}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles}
    </div>
  );
});

export default LightParticles;