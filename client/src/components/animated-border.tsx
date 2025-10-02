interface AnimatedBorderProps {
  borderNumber: number;
}

export default function AnimatedBorder({ borderNumber }: AnimatedBorderProps) {
  const borderMap = [5, 2, 3, 4, 1];
  const borderIndex = borderMap[(borderNumber - 1) % 5];
  const borderSrc = `/images/b${borderIndex}.svg`;

  return (
    <div
      className="w-full overflow-hidden py-0 my-0"
      data-testid={`animated-border-${borderNumber}`}
      style={{ fontSize: 0, lineHeight: 0 }}
    >
      <div
        className="animate-scroll-horizontal"
        style={{ width: "fit-content", display: "flex" }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <img
            key={i}
            src={borderSrc}
            alt="Decorative border"
            className="border-image h-8 sm:h-12 md:h-16"
            style={{
              width: "auto",
              display: "block",
              margin: "0 -2px",
              padding: 0,
              verticalAlign: "top",
              lineHeight: 0,
              transform: "scaleX(1.02)",
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
          animation: scroll-horizontal 10s linear infinite;
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
        }
      `}</style>
    </div>
  );
}
