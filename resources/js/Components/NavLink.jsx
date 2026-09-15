import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-primary-400 text-navy-700 focus:border-primary-700'
                    : 'border-transparent text-navy-400 hover:border-navy-300 hover:text-navy-700 focus:border-navy-300 focus:text-navy-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
