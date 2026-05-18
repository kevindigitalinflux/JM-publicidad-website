import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface StaticCarouselProps {
  images: string[];
  imageHeight?: number;
}

/** Single-image paginated carousel — full-bleed width, GSAP slide, overlaid arrow controls */
export function StaticCarousel({ images, imageHeight = 320 }: StaticCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [page, setPage]           = useState(0);
  const total = images.length;

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setItemWidth(el.clientWidth);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => {
      measure();
      setPage(0);
      if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track || itemWidth === 0) return;
    gsap.to(track, { x: -(next * itemWidth), duration: 0.5, ease: 'power2.inOut' });
    setPage(next);
  };

  const canPrev = page > 0;
  const canNext = page < total - 1;

  return (
    <div>
      <div className="relative">
        {/* Full-bleed image strip */}
        <div ref={containerRef} className="overflow-hidden">
          <div ref={trackRef} style={{ display: 'flex' }}>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Portfolio image ${i + 1}`}
                loading="lazy"
                style={{
                  flexShrink: 0,
                  width: itemWidth > 0 ? itemWidth : '100vw',
                  height: imageHeight,
                  objectFit: 'contain',
                  backgroundColor: '#fbf9f5',
                }}
              />
            ))}
          </div>
        </div>

        {/* Left arrow */}
        <button
          onClick={() => canPrev && goTo(page - 1)}
          disabled={!canPrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-jm-primary/20 hover:bg-jm-primary text-jm-primary hover:text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => canNext && goTo(page + 1)}
          disabled={!canNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-jm-primary/20 hover:bg-jm-primary text-jm-primary hover:text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <div className="flex justify-center mt-3">
        <span className="font-inter text-jm-body/60 text-xs tabular-nums">
          {page + 1} / {total}
        </span>
      </div>
    </div>
  );
}
