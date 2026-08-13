import React, { useCallback, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/utils';
import { useDimensions } from '@/components/hooks/use-debounced-dimensions';

interface PixelTrailProps {
  pixelSize: number; // px
  fadeDuration?: number; // ms
  delay?: number; // ms
  className?: string;
  pixelClassName?: string;
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const trailId = useRef(uuidv4());

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(`${trailId.current}-pixel-${x}-${y}`);
      if (pixelElement) {
        const animatePixel = (pixelElement as unknown as { __animatePixel?: () => void })
          .__animatePixel;
        if (animatePixel) animatePixel();
      }
    },
    [pixelSize]
  );

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize]);
  const rows = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-auto absolute inset-0 h-full w-full', className)}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface PixelDotProps {
  id: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
}

// Plain CSS transitions instead of Framer Motion's imperative controls API:
// with React 19, `useAnimationControls().start()` silently no-ops (the
// underlying VisualElement never subscribes), so pixels never lit up.
// Direct style + transition sidesteps that entirely and is simpler besides.
//
// The hold-before-fade uses setTimeout rather than transition-delay —
// transition-delay paired with transition-duration: 0 (the default here)
// is unreliable across browsers and can silently never apply the target
// value, so the delay is handled in JS and the transition only owns the
// fade itself.
const PixelDot: React.FC<PixelDotProps> = React.memo(({ id, size, fadeDuration, delay, className }) => {
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      let timeoutId: ReturnType<typeof setTimeout>;
      const animatePixel = () => {
        clearTimeout(timeoutId);
        node.style.transitionProperty = 'none';
        node.style.opacity = '1';
        // Force a reflow so the opacity:1 state is committed before the
        // fade-out transition below is registered on the next frame.
        void node.offsetHeight;
        node.style.transitionProperty = 'opacity';
        node.style.transitionDuration = `${fadeDuration}ms`;
        timeoutId = setTimeout(() => {
          node.style.opacity = '0';
        }, delay);
      };
      (node as unknown as { __animatePixel: () => void }).__animatePixel = animatePixel;
    },
    [fadeDuration, delay]
  );

  return (
    <div
      id={id}
      ref={ref}
      className={cn('cursor-pointer-none opacity-0 ease-out', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
});

PixelDot.displayName = 'PixelDot';
export { PixelTrail };
