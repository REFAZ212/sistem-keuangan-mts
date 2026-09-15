import { colors } from '@/designSystem';

const variants = {
    default: 'bg-navy-100 text-navy-800 border-navy-200',
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    success: 'bg-success-100 text-success-800 border-success-200',
    danger: 'bg-danger-100 text-danger-800 border-danger-200',
    warning: 'bg-warning-100 text-warning-800 border-warning-200',
    info: 'bg-primary-100 text-primary-800 border-primary-200',
    outline: 'bg-transparent text-navy-600 border-navy-300',
};

const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
};

export default function Badge({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    status,
    dot = false,
}) {
    let variantClass = variants[variant];

    if (status && colors.status[status]) {
        variantClass = `${colors.status[status].bg} ${colors.status[status].text} ${colors.status[status].border}`;
    }

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 font-medium rounded-full border
                ${variantClass} ${sizes[size]} ${className}
            `}
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full ${
                        colors.status[status] ? colors.status[status].text.replace('text', 'bg') : 'bg-navy-600'
                    }`}
                />
            )}
            {children}
        </span>
    );
}

export function StatusBadge({ status, className = '', showDot = true, ...props }) {
    const labels = {
        draft: 'Draft',
        disetujui: 'Disetujui',
        pending: 'Pending',
        rejected: 'Ditolak',
    };

    return (
        <Badge
            variant="default"
            status={status}
            dot={showDot}
            className={className}
            {...props}
        >
            {labels[status] || status}
        </Badge>
    );
}
