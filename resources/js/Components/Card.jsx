export default function Card({
    className = '',
    children,
    header,
    footer,
    padding = 'p-6',
    hover = false,
}) {
    return (
        <div
            className={
                'bg-white rounded-xl border border-navy-200 shadow-sm transition-all duration-200 ' +
                (hover ? 'hover:shadow-md hover:border-navy-200' : '') +
                ' ' + className
            }
        >
            {header && (
                <div className="px-6 py-4 border-b border-navy-100">
                    {header}
                </div>
            )}
            <div className={padding}>{children}</div>
            {footer && (
                <div className="px-6 py-4 border-t border-navy-100 bg-navy-50 rounded-b-xl">
                    {footer}
                </div>
            )}
        </div>
    );
}

export function CardHeader({ className = '', children, title, description, action }) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div>
                {title && <h3 className="text-lg font-semibold text-navy-700">{title}</h3>}
                {description && <p className="mt-1 text-sm text-navy-400">{description}</p>}
            </div>
            {action && <div className="ml-4">{action}</div>}
        </div>
    );
}

export function CardFooter({ className = '', children }) {
    return (
        <div className={`flex items-center justify-end gap-3 ${className}`}>
            {children}
        </div>
    );
}
