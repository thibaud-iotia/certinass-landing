interface CaptureProps {
  src: string;
  alt: string;
  /** Petite vignette : rayon réduit. */
  small?: boolean;
  /** Visible dès l'arrivée sur la page : pas de chargement différé. */
  eager?: boolean;
  className?: string;
}

/** Fenêtre d'application : une capture 1440×900 dans son cadre. */
export function Capture({ src, alt, small = false, eager = false, className }: CaptureProps) {
  const classes = ['capture', small && 'capture-sm', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <img src={src} alt={alt} width={1440} height={900} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </div>
  );
}
