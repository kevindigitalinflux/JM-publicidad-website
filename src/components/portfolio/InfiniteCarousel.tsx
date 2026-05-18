import { useEffect, useRef } from 'react';

interface InfiniteCarouselProps {
  images: string[];
  direction: 'left' | 'right';
  /** Seconds for one full cycle. Default 40. */
  speed?: number;
  /** Image height in px. Default 300. */
  imageHeight?: number;
}

/** Infinite auto-scrolling image strip. Pauses when scrolled off-screen to save GPU. */
export function InfiniteCarousel({ images, direction, speed = 40, imageHeight = 300 }: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationName = direction === 'left' ? 'jm-scroll-left' : 'jm-scroll-right';

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const observer = new IntersectionObserver(
      ([entry]) => { track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'; },
      { threshold: 0 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      <div
        ref={trackRef}
        className="jm-carousel-track"
        style={{
          display: 'flex',
          gap: '1rem',
          width: 'max-content',
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: 'paused',
        }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{ height: `min(${imageHeight}px, 55vw)`, width: 'auto', flexShrink: 0, borderRadius: '0.75rem', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
}
