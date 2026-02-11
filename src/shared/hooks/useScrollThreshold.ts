import { useEffect, useState } from "react";

export function useScrollThreshold(threshold = 50): boolean {
  const [isBeyondThreshold, setIsBeyondThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsBeyondThreshold(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isBeyondThreshold;
}
