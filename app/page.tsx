import { SceneLayer } from '@/three/scene/scene-layer';
import { HomeShell } from '@/components/home-shell';

/**
 * Home — the single continuous experience (PRD Part 13).
 *
 * The persistent R3F world (SceneLayer) sits in a fixed layer behind the DOM.
 * HomeShell decides the hero presentation: photoreal image + composited RO when
 * the background image is present, otherwise the full functional DOM UI.
 */
export default function HomePage() {
  return (
    <>
      <SceneLayer />
      <HomeShell />
    </>
  );
}
