'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    href?: string;
    type?: 'button' | 'submit';
    ariaLabel?: string;
    disabled?: boolean;
}

export const Button = ({
    children,
    onClick,
    className,
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    ariaLabel,
    disabled,
}: ButtonProps) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95';

    const variants = {
        primary:
            'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/5',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md',
        outline: 'border border-white/20 text-white hover:bg-white/5',
        ghost: 'text-white/70 hover:text-white hover:bg-white/5',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs font-bold uppercase tracking-wider',
        md: 'px-6 py-3 text-sm font-bold uppercase tracking-wider',
        lg: 'px-8 py-4 text-sm font-bold uppercase tracking-widest',
        icon: 'p-3',
    };

    const combinedClassName = cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className,
    );

    const content = (
        <motion.span whileHover={{ y: -1 }} className="flex items-center gap-2">
            {children}
        </motion.span>
    );

    if (href) {
        return (
            <a href={href} className={combinedClassName} aria-label={ariaLabel}>
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClassName}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            {content}
        </button>
    );
};
