/* eslint-disable import/prefer-default-export */
import { useState, RefObject, useEffect } from 'react';

export function cursor(ref: RefObject<HTMLDivElement>) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      const x = (clientX - (element.offsetLeft + element.offsetWidth / 5)) / 20;
      const y = (clientY - (element.offsetTop + element.offsetHeight / 5)) / 20;

      setPoint({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [ref]);

  return point;
}
