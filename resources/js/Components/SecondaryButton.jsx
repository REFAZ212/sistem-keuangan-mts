export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    loading = false,
    variant = 'default',
    children,
    ...props
}) {
    const variants = {
        default: 'border border-navy-200 bg-white hover:bg-navy-50 focus:ring-primary-500',
        text: 'border-0 bg-transparent hover:bg-navy-50 focus:ring-primary-500',
    };

    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-navy-600 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    disabled || loading
                        ? 'opacity-50 cursor-not-allowed'
                        : variants[variant] || variants.default
                } ` + className
            }
            disabled={disabled || loading}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {children}
        </button>
    );
}
