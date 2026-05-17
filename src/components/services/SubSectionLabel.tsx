interface SubSectionLabelProps {
  label: string;
}

/** Olive accent divider row between sub-groups within a catalogue section */
export function SubSectionLabel({ label }: SubSectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-5 bg-jm-primary rounded-full shrink-0" />
      <span className="font-inter font-semibold text-jm-primary text-[11px] tracking-[0.18em] uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-jm-primary/15" />
    </div>
  );
}
