interface AnimatedBorderProps {
  borderNumber: number;
}

export default function AnimatedBorder({ borderNumber }: AnimatedBorderProps) {
  const borderMap = [5, 2, 3, 4, 1];
  const borderIndex = borderMap[(borderNumber - 1) % 5];
  const borderSrc = `/images/b${borderIndex}.svg`;

  return (
    <div
      className="w-full overflow-hidden relative"
      data-testid={`animated-border-${borderNumber}`}
      style={{ 
        fontSize: 0, 
        lineHeight: 0,
        height: '2rem'
      }}
    >
      <div
        className="animate-scroll-horizontal absolute top-0 left-0"
        style={{ 
          display: "flex",
          whiteSpace: 'nowrap'
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
              margin: 0,
              padding: 0,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={borderSrc}
              alt=""
              className="border-image"
              style={{
                height: "2rem",
                width: "auto",
                display: "block",
                margin: 0,
                padding: 0,
                clipPath: "inset(0 6% 0 6%)",
                transform: "scaleX(1.15)",
                transformOrigin: "center",
                verticalAlign: "top",
                lineHeight: 0
              }}
            />
          </div>
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
          animation: scroll-horizontal 20s linear infinite;
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
            height: 3rem !important;
          }
        }
        
        @media (min-width: 768px) {
          .border-image {
            height: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
}
