import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  separator = ',',
}) => {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef(end);
  const durationRef = useRef(duration);

  // Update refs when props change
  useEffect(() => {
    endRef.current = end;
    durationRef.current = duration;
  }, [end, duration]);

  const animateCount = useCallback(() => {
    const startTime = performance.now();
    const targetEnd = endRef.current;
    const targetDuration = durationRef.current;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / targetDuration, 1);
      
      // Easing function for smoother animation (ease-out-quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(targetEnd * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(targetEnd);
      }
    };

    requestAnimationFrame(updateCount);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            animateCount();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animateCount]);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return (
    <span ref={elementRef}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default CountUp;





