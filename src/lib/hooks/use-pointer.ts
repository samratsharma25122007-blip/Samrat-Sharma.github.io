'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * Tracks the normalized pointer position in [-1, 1] at the window level.
 *
 * Reading from the window (rather than the R3F canvas element) lets the 3D
 * world sit behind the DOM with `pointer-events: none` while still responding
 * to the cursor for parallax and the Water Memory System. Updates a ref (no
 * re-renders); the render loop reads it each frame.
 */
export function usePointer(): MutableRefObject<{ x: number; y: number }> {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pointer;
}
