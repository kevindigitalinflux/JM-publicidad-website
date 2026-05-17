interface InfiniteCarouselProps {
  images: string[];
  direction: 'left' | 'right';
  /** Seconds for one full cycle. Default 40. */
  speed?: number;
  /** Image height in px. Default 300. */
  imageHeight?: number;
}

/** Infinite auto-scrolling image strip. Duplicates images for a seamless loop. */
export function InfiniteCarousel({ images, direction, speed = 40, imageHeight = 300 }: InfiniteCarouselProps) {
  const animationName = direction === 'left' ? 'jm-scroll-left' : 'jm-scroll-right';

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        className="jm-carousel-track"
        style={{
          display: 'flex',
          gap: '1rem',
          width: 'max-content',
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{ height: imageHeight, width: 'auto', flexShrink: 0, borderRadius: '0.75rem', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
}
