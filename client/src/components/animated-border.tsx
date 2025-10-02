interface AnimatedBorderProps {
  borderNumber: number;
}

export default function AnimatedBorder({ borderNumber }: AnimatedBorderProps) {
  const borderMap = [5, 2, 3, 4, 1];
  const borderIndex = borderMap[(borderNumber - 1) % 5];
  const borderSrc = `/images/b${borderIndex}.svg`;

  return (
    <div
      className="w-full overflow-hidden"
      data-testid={`animated-border-${borderNumber}`}
      style={{ 
        fontSize: 0, 
        lineHeight: 0,
        height: '2rem',
        position: 'relative'
      }}
    >
      <div
        className="animate-scroll-horizontal"
        style={{ 
          width: "fit-content", 
          display: "flex",
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <img
            key={i}
            src={borderSrc}
            alt=""
            className="border-image"
            style={{
              height: "2rem",
              width: "auto",
              display: "block",
              margin: "0 -8px",
              padding: 0,
              verticalAlign: "top",
              lineHeight: 0,
              flexShrink: 0
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
          animation: scroll-horizontal 15s linear infinite;
          display: flex;
          gap: 0;
          line-height: 0;
          font-size: 0;
        }
        
        .border-image {
          vertical-align: top;
          line-height: 0;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          pointer-events: none;
          user-select: none;
        }
        
        @media (min-width: 640px) {
          .border-image {
            height: 3rem;
          }
        }
        
        @media (min-width: 768px) {
          .border-image {
            height: 4rem;
          }
        }
      `}</style>
    </div>
  );
}
