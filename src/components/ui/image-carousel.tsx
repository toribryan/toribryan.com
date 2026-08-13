import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

export interface CarouselImage {
  /** Omit to render a gray placeholder fill instead of a real image. */
  src?: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

const FULL_WIDTH_PX = 96;
const COLLAPSED_WIDTH_PX = 28;
const GAP_PX = 4;

function Slide({ image, className }: { image: CarouselImage; className?: string }) {
  if (!image.src) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`h-full w-full bg-[#d9d9d9] ${className ?? ''}`}
      />
    );
  }
  return (
    <img
      src={image.src}
      alt={image.alt}
      className={`pointer-events-none h-full w-full select-none object-cover ${className ?? ''}`}
      draggable={false}
    />
  );
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      animate(x, -index * containerWidth, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }, [index, x, isDragging]);

  if (images.length === 0) return null;

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl" ref={containerRef}>
        <motion.div
          className="flex h-full"
          drag={images.length > 1 ? 'x' : false}
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            const containerWidth = containerRef.current?.offsetWidth || 1;
            const { offset, velocity } = info;

            let newIndex = index;
            if (Math.abs(velocity.x) > 500) {
              newIndex = velocity.x > 0 ? index - 1 : index + 1;
            } else if (Math.abs(offset.x) > containerWidth * 0.3) {
              newIndex = offset.x > 0 ? index - 1 : index + 1;
            }
            setIndex(Math.max(0, Math.min(images.length - 1, newIndex)));
          }}
          style={{ x }}
        >
          {images.map((image, i) => (
            <div key={i} className="h-full w-full shrink-0">
              <Slide image={image} />
            </div>
          ))}
        </motion.div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              aria-label="Previous image"
              className={`absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-ink shadow-md transition-transform ${
                index === 0 ? 'cursor-not-allowed opacity-40' : 'opacity-80 hover:scale-110 hover:opacity-100'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              disabled={index === images.length - 1}
              onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))}
              aria-label="Next image"
              className={`absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-ink shadow-md transition-transform ${
                index === images.length - 1
                  ? 'cursor-not-allowed opacity-40'
                  : 'opacity-80 hover:scale-110 hover:opacity-100'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="scrollbar-hide hidden flex-shrink-0 overflow-x-auto px-4 pb-4 md:block"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex h-14 gap-1" style={{ width: 'fit-content' }}>
            {images.map((image, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                initial={false}
                animate={i === index ? 'active' : 'inactive'}
                variants={{
                  active: { width: FULL_WIDTH_PX },
                  inactive: { width: COLLAPSED_WIDTH_PX },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative h-full shrink-0 overflow-hidden rounded-md"
                style={{ marginRight: GAP_PX }}
              >
                <Slide image={image} />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
