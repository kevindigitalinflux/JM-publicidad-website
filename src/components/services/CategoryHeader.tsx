interface CategoryHeaderProps {
  title: string;
  subtitle: string;
  tag: string;
}

/** Full-width green section header for each catalogue category */
export function CategoryHeader({ title, subtitle, tag }: CategoryHeaderProps) {
  return (
    <div className="bg-jm-primary px-6 py-10 md:py-14">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        <span className="font-inter font-semibold text-white/60 text-[10px] tracking-[0.22em] uppercase">
          {tag}
        </span>
        <h2 className="font-manrope font-extrabold text-white text-[28px] md:text-[36px] leading-tight tracking-[-0.03em]">
          {title}
        </h2>
        <p className="font-inter text-white/80 text-sm leading-6 max-w-lg">{subtitle}</p>
      </div>
    </div>
  );
}
