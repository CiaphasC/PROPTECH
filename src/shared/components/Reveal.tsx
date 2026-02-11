import { useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/cn";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        className,
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
        filter: isVisible ? "blur(0)" : "blur(10px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
