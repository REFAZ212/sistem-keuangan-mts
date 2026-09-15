import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-primary-400 bg-primary-50 text-primary-700 focus:border-primary-700 focus:bg-primary-100 focus:text-primary-800'
                    : 'border-transparent text-navy-600 hover:border-navy-300 hover:bg-navy-50 hover:text-navy-800 focus:border-navy-300 focus:bg-navy-50 focus:text-navy-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
