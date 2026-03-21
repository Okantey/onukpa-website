type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

const SectionIntro = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionIntroProps) => {
  const alignCls =
    align === "center" ? "text-center" : "text-left max-w-2xl";

  return (
    <div
      className={`mb-12 md:mb-16 animate-on-scroll max-w-2xl ${align === "center" ? "mx-auto" : ""} ${alignCls} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-stone-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionIntro;
