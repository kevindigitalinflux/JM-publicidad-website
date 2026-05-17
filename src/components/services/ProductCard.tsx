interface ProductCardProps {
  title: string;
  specs: string[];
}

/** Single product card — name + spec bullet list */
export function ProductCard({ title, specs }: ProductCardProps) {
  return (
    <div className="bg-jm-bg-card rounded-xl p-5 flex flex-col gap-3 border border-[#e4e2df]">
      <h4 className="font-manrope font-bold text-jm-heading text-sm leading-snug">
        {title}
      </h4>
      {specs.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2">
              <span className="bg-jm-primary w-1.5 h-1.5 rounded-full mt-[5px] shrink-0" />
              <span className="font-inter text-xs text-jm-body leading-5">{spec}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
