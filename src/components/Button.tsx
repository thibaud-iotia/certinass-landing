import type { AnchorHTMLAttributes } from 'react';

// Bouton du design system Certflix, rendu en lien : sur la page, chaque bouton mène quelque part.

export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

export function Button({ variant = 'primary', size = 'md', block = false, className, children, ...rest }: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`, block && 'btn-block', className].filter(Boolean).join(' ');
  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
