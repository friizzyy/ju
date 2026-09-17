/** Matches the CSS fallback in HomeHero.module.css; dimensions are the agent field. */
export function heroOrbit(width: number, height: number, compact: boolean) {
  return {
    x: Math.max(
      0,
      Math.min((width - (compact ? 72 : 144)) / 1.7, compact ? 260 : 620),
    ),
    y: Math.max(
      0,
      Math.min(height * (compact ? 0.44 : 0.46), compact ? 200 : 480),
    ),
  }
}
