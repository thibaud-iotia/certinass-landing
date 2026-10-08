import type { MouseEventHandler, ReactNode } from 'react';

// Bouton du design system Certflix : un lien quand il mène quelque part (`href`), un bouton quand il déclenche une action.

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', block = false, href, disabled, onClick, className, children }: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`, block && 'btn-block', className].filter(Boolean).join(' ');
  if (href !== undefined) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
