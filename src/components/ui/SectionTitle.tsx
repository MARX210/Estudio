
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionTitle({ title, subtitle, className, titleClassName, subtitleClassName }: SectionTitleProps) {
  return (
    <div className={cn("mb-8 md:mb-12 text-center", className)}>
      <h2 className={cn("text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-3", titleClassName)}>{title}</h2>
      {subtitle && <p className={cn("text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", subtitleClassName)}>{subtitle}</p>}
    </div>
  );
}

