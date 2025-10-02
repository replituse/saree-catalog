interface AnimatedBorderProps {
  borderNumber: number;
}

export default function AnimatedBorder({ borderNumber }: AnimatedBorderProps) {
  const borderIndex = ((borderNumber - 1) % 5) + 1;
  const borderSrc = `/images/b${borderIndex}.svg`;

  return (
    <div className="w-full overflow-hidden py-0 my-0" data-testid={`animated-border-${borderNumber}`}>
      <div className="animate-scroll-horizontal flex gap-0" style={{ width: 'fit-content' }}>
        <img
          src={borderSrc}
          alt="Decorative border"
          className="h-8 sm:h-12 md:h-16 block"
          style={{ width: 'auto', display: 'block', margin: 0, padding: 0 }}
        />
        <img
          src={borderSrc}
          alt="Decorative border"
          className="h-8 sm:h-12 md:h-16 block"
          style={{ width: 'auto', display: 'block', margin: 0, padding: 0 }}
        />
        <img
          src={borderSrc}
          alt="Decorative border"
          className="h-8 sm:h-12 md:h-16 block"
          style={{ width: 'auto', display: 'block', margin: 0, padding: 0 }}
        />
        <img
          src={borderSrc}
          alt="Decorative border"
          className="h-8 sm:h-12 md:h-16 block"
          style={{ width: 'auto', display: 'block', margin: 0, padding: 0 }}
        />
      </div>
      
      <style>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
          display: flex;
          gap: 0;
        }
        
        .animate-scroll-horizontal img {
          vertical-align: top;
        }
      `}</style>
    </div>
  );
}
