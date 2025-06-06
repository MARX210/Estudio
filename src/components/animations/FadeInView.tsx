'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: string; // Ex: 'delay-200'
  duration?: string; // Ex: 'duration-700'
  threshold?: number;
  triggerOnce?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
}

export function FadeInView({
  children,
  className,
  delay = 'delay-0',
  duration = 'duration-700',
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  scale = false,
}: FadeInViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, triggerOnce]);

  const translateClass = !isVisible
    ? direction === 'up'
      ? 'translate-y-8'
      : direction === 'down'
      ? '-translate-y-8'
      : direction === 'left'
      ? 'translate-x-8'
      : '-translate-x-8'
    : 'translate-x-0 translate-y-0';

  const scaleClass = scale ? (isVisible ? 'scale-100' : 'scale-95') : '';

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        duration,
        delay,
        isVisible ? 'opacity-100' : 'opacity-0',
        translateClass,
        scaleClass,
        className
      )}
    >
      {children}
    </div>
  );
}
