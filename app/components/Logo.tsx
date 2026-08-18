/**
 * The Ancher mark. Traced from the brand PNG: the motif has three-fold
 * rotational symmetry, so only one lobe is stored and the other two are
 * `<use>` rotations — guaranteeing they stay identical.
 *
 * NOTE: this was reconstructed from a 276px screenshot. Swap in the original
 * vector when it is available; the shape is close but not the exact curves.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Ancher"
    >
      <path id="ancher-lobe" d="M51.50 44.18C49.72 44.30 47.88 44.18 46.11 43.90C44.35 43.61 42.56 43.14 40.90 42.47C39.25 41.79 37.64 40.88 36.19 39.83C34.74 38.79 33.38 37.54 32.20 36.20C31.03 34.85 29.98 33.33 29.11 31.76C28.24 30.20 27.59 28.48 26.98 26.79C26.38 25.09 25.99 23.32 25.46 21.60C24.94 19.87 24.29 18.17 23.84 16.43C23.38 14.70 22.11 12.26 22.74 11.17C23.37 10.09 25.92 10.13 27.64 9.94C29.36 9.75 31.31 9.73 33.05 10.03C34.80 10.33 36.76 10.76 38.14 11.76C39.52 12.76 40.60 14.45 41.34 16.04C42.08 17.63 42.20 19.54 42.58 21.30C42.96 23.06 43.26 24.84 43.60 26.61C43.94 28.39 43.81 30.53 44.61 31.93C45.40 33.33 46.83 34.57 48.35 35.01C49.86 35.45 52.48 35.44 53.69 34.56C54.91 33.68 55.13 31.40 55.62 29.71C56.10 28.01 56.27 26.16 56.61 24.39C56.95 22.61 57.15 20.79 57.64 19.07C58.14 17.35 58.56 15.44 59.58 14.06C60.59 12.67 62.16 11.45 63.73 10.76C65.31 10.08 67.26 10.08 69.05 9.95C70.84 9.81 73.16 9.37 74.46 9.95C75.77 10.52 76.71 11.95 76.86 13.39C77.01 14.83 75.88 16.86 75.38 18.59C74.87 20.33 74.36 22.06 73.81 23.78C73.26 25.49 72.76 27.24 72.05 28.89C71.34 30.54 70.54 32.19 69.56 33.68C68.57 35.18 67.43 36.64 66.14 37.87C64.84 39.11 63.34 40.19 61.79 41.08C60.23 41.97 58.54 42.70 56.82 43.21C55.11 43.73 53.29 44.07 51.50 44.18Z" />
      <use href="#ancher-lobe" transform="rotate(120 50 50)" />
      <use href="#ancher-lobe" transform="rotate(240 50 50)" />
    </svg>
  );
}
