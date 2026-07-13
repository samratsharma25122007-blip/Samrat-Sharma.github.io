'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

interface DragRotateOptions {
  /** Radians of rotation per pixel dragged. */
  sensitivity?: number;
  /** Velocity retained per frame after release (0–1). */
  friction?: number;
}

/**
 * useDragRotate — click/touch-drag to spin the hero RO with natural inertia
 * (PRD Part 3). Returns a ref holding the target Y rotation (radians) that the
 * 3D object eases toward.
 *
 * Listens at the window level so it works while the WebGL canvas sits behind the
 * DOM with `pointer-events: none`. Drags that begin on interactive UI (links,
 * buttons, inputs, or anything marked `[data-ui]`) are ignored so the RO only
 * responds to gestures on the open scene.
 */
export function useDragRotate({
  sensitivity = 0.01,
  friction = 0.94,
}: DragRotateOptions = {}): MutableRefObject<number> {
  const rotation = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && target.closest('a,button,input,select,textarea,label,[data-ui]');

    const onDown = (event: PointerEvent) => {
      if (isInteractive(event.target)) return;
      dragging.current = true;
      lastX.current = event.clientX;
      velocity.current = 0;
      document.body.style.cursor = 'grabbing';
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      const dx = event.clientX - lastX.current;
      lastX.current = event.clientX;
      const delta = dx * sensitivity;
      rotation.current += delta;
      velocity.current = delta;
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });

    // Inertia loop — decays residual velocity after release.
    let raf = 0;
    const tick = () => {
      if (!dragging.current && Math.abs(velocity.current) > 0.00001) {
        rotation.current += velocity.current;
        velocity.current *= friction;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, [sensitivity, friction]);

  return rotation;
}
