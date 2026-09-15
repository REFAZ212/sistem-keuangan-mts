/**
 * Icon set — gaya outline konsisten (stroke, tanpa fill), dipakai di
 * seluruh aplikasi (sidebar, topbar, cards) agar satu visual language.
 * Semua icon: viewBox 0 0 24 24, strokeWidth 1.6, strokeLinecap/Linejoin round.
 */
export default function Icon({ name, className = 'h-5 w-5' }) {
    const common = {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
    };

    switch (name) {
        case 'dashboard':
            return (
                <svg {...common}>
                    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.8" />
                    <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.8" />
                    <rect x="13" y="10.5" width="7.5" height="10" rx="1.8" />
                    <rect x="3.5" y="13.5" width="7.5" height="7" rx="1.8" />
                </svg>
            );
        case 'arrow-down-circle':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 8v7M8.7 12.3 12 15.6l3.3-3.3" />
                </svg>
            );
        case 'arrow-up-circle':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 16V9M8.7 11.7 12 8.4l3.3 3.3" />
                </svg>
            );
        case 'wallet':
            return (
                <svg {...common}>
                    <path d="M3.5 7.8c0-1.3 1-2.3 2.3-2.3h11.4c1.3 0 2.3 1 2.3 2.3v8.4c0 1.3-1 2.3-2.3 2.3H5.8c-1.3 0-2.3-1-2.3-2.3V7.8Z" />
                    <path d="M15.2 12.4h3v2.6h-3a1.3 1.3 0 0 1 0-2.6Z" />
                </svg>
            );
        case 'target':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.2" />
                    <circle cx="12" cy="12" r="4.6" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'file-text':
            return (
                <svg {...common}>
                    <path d="M7 3.5h7.5L18 7v13a1.2 1.2 0 0 1-1.2 1.2H7A1.2 1.2 0 0 1 5.8 20V4.7A1.2 1.2 0 0 1 7 3.5Z" />
                    <path d="M14.3 3.5V7H18" />
                    <path d="M8.5 12h6M8.5 15.2h6M8.5 8.8h2.2" />
                </svg>
            );
        case 'calendar':
            return (
                <svg {...common}>
                    <rect x="3.5" y="5" width="17" height="15.2" rx="2" />
                    <path d="M3.5 9.4h17M8 3v3.6M16 3v3.6" />
                </svg>
            );
        case 'tag':
            return (
                <svg {...common}>
                    <path d="M11.6 3.7h5.7a1 1 0 0 1 1 1v5.7a1.5 1.5 0 0 1-.44 1.06l-8.2 8.2a1.5 1.5 0 0 1-2.12 0l-5.66-5.66a1.5 1.5 0 0 1 0-2.12l8.2-8.2a1.5 1.5 0 0 1 1.52-.98Z" />
                    <circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'layers':
            return (
                <svg {...common}>
                    <path d="M12 3.8 3.5 8.2 12 12.6l8.5-4.4L12 3.8Z" />
                    <path d="m3.5 12 8.5 4.4L20.5 12M3.5 15.8 12 20.2l8.5-4.4" />
                </svg>
            );
        case 'users':
            return (
                <svg {...common}>
                    <circle cx="9" cy="8.5" r="3" />
                    <path d="M2.8 19c.7-3 3-4.8 6.2-4.8s5.5 1.8 6.2 4.8" />
                    <path d="M15.5 6a3 3 0 0 1 0 5.8M18.6 19c-.5-2.2-1.7-3.7-3.5-4.5" />
                </svg>
            );
        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3.5 5 6.2v5.1c0 4.3 2.9 7.6 7 8.7 4.1-1.1 7-4.4 7-8.7V6.2L12 3.5Z" />
                    <path d="m9 12 2.1 2.1L15.3 10" />
                </svg>
            );
        case 'settings':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M19.4 12a7.4 7.4 0 0 0-.13-1.36l1.98-1.5-1.8-3.1-2.32.86a7.5 7.5 0 0 0-2.36-1.36L14.4 3H9.6l-.37 2.54a7.5 7.5 0 0 0-2.36 1.36l-2.32-.86-1.8 3.1 1.98 1.5a7.4 7.4 0 0 0 0 2.72l-1.98 1.5 1.8 3.1 2.32-.86c.7.6 1.5 1.06 2.36 1.36L9.6 21h4.8l.37-2.54c.86-.3 1.66-.76 2.36-1.36l2.32.86 1.8-3.1-1.98-1.5c.09-.45.13-.9.13-1.36Z" />
                </svg>
            );
        case 'bell':
            return (
                <svg {...common}>
                    <path d="M6 9.5a6 6 0 0 1 12 0v4.2l1.6 2.5H4.4L6 13.7V9.5Z" />
                    <path d="M10 19a2 2 0 0 0 4 0" />
                </svg>
            );
        case 'chevron-down':
            return (
                <svg {...common}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            );
        case 'receipt':
            return (
                <svg {...common}>
                    <path d="M6.5 3.5h11v17l-2.2-1.5-2.05 1.5-2.05-1.5L9.15 20l-2.2-1.5-.45.3V3.5Z" />
                    <path d="M9 8h6M9 11.3h6M9 14.6h3.5" />
                </svg>
            );
        case 'export':
            return (
                <svg {...common}>
                    <path d="M12 14.5V4M8.3 7.6 12 4l3.7 3.6" />
                    <path d="M4.5 15v3.3c0 1.2 1 2.2 2.2 2.2h10.6c1.2 0 2.2-1 2.2-2.2V15" />
                </svg>
            );
        case 'menu':
            return (
                <svg {...common}>
                    <path d="M4 6.5h16M4 12h16M4 17.5h16" />
                </svg>
            );
        case 'x':
            return (
                <svg {...common}>
                    <path d="m6 6 12 12M18 6 6 18" />
                </svg>
            );
        case 'arrow-right':
            return (
                <svg {...common}>
                    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
                </svg>
            );
        case 'dots':
            return (
                <svg {...common} strokeWidth={2.2}>
                    <path d="M5 12h.01M12 12h.01M19 12h.01" />
                </svg>
            );
        case 'plus':
            return (
                <svg {...common}>
                    <path d="M12 5v14M5 12h14" />
                </svg>
            );
        case 'search':
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="7.5" />
                    <path d="m20 20-3.5-3.5" />
                </svg>
            );
        case 'bell':
            return (
                <svg {...common}>
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
            );
        case 'clock':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                </svg>
            );
        case 'check-circle':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="m8.3 12.3 2.5 2.5 5-5.2" />
                </svg>
            );
        case 'alert-circle':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 8v4.5" />
                    <circle cx="12" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'users':
            return (
                <svg {...common}>
                    <circle cx="8.5" cy="8" r="3.5" />
                    <path d="M2 19.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M18 14c2.2 0 4 1.3 4 3.5" />
                </svg>
            );
        case 'settings':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            );
        case 'download':
            return (
                <svg {...common}>
                    <path d="M21 15v4a2 2 0 1 1-4 0v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            );
        default:
            return null;
    }
}