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
    <div className={cn("mb-10 md:mb-16 text-center", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-bold text-primary mb-3", titleClassName)}>{title}</h2>
      {subtitle && <p className={cn("text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", subtitleClassName)}>{subtitle}</p>}
    </div>
  );
}
