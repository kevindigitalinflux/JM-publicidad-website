interface InfiniteCarouselProps {
  images: string[];
  direction: 'left' | 'right';
  /** Seconds for one full cycle. Default 40. */
  speed?: number;
  /** Image height in px. Default 300. */
  imageHeight?: number;
}

/** Infinite auto-scrolling image strip. Duplicates images for seamless loop. */
export function InfiniteCarousel({ images, direction, speed = 40, imageHeight = 300 }: InfiniteCarouselProps) {
  const animClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div className="overflow-hidden group">
      <div
        className={`flex gap-4 w-max ${animClass} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{ height: imageHeight }}
            className="w-auto flex-shrink-0 rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}
