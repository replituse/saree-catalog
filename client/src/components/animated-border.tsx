interface AnimatedBorderProps {
  borderNumber: number;
}

export default function AnimatedBorder({ borderNumber }: AnimatedBorderProps) {
  const borderIndex = ((borderNumber - 1) % 5) + 1;
  const borderSrc = `/images/b${borderIndex}.svg`;

  return (
    <div className="w-full overflow-hidden py-0 my-0" data-testid={`animated-border-${borderNumber}`}>
      <div className="animate-scroll-horizontal" style={{ width: 'fit-content', display: 'flex' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            src={borderSrc}
            alt="Decorative border"
            className="h-8 sm:h-12 md:h-16"
            style={{ 
              width: 'auto', 
              display: 'block', 
              margin: 0, 
              padding: 0,
              verticalAlign: 'top',
              lineHeight: 0
            }}
          />
        ))}
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
          animation: scroll-horizontal 8s linear infinite;
          display: flex;
          gap: 0;
          line-height: 0;
        }
        
        .animate-scroll-horizontal img {
          vertical-align: top;
          line-height: 0;
        }
      `}</style>
    </div>
  );
}
