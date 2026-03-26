import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', loading, fullWidth, disabled, className = '', ...props }, ref) => {
    const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-[#0066cc] text-white hover:bg-[#0052a3] active:bg-[#003d7a]',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
