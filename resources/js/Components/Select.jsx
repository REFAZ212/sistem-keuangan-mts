import { forwardRef } from 'react';

export default forwardRef(function Select(
    { className = '', error = false, options = [], placeholder = 'Pilih...', ...props },
    ref,
) {
    return (
        <select
            {...props}
            ref={ref}
            className={
                `w-full rounded-md border px-3 py-2 text-sm text-navy-700 bg-white transition-colors duration-200 ` +
                `focus:outline-none focus:ring-2 focus:ring-offset-0 ` +
                (error
                    ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-200'
                    : 'border-navy-200 focus:border-primary-500 focus:ring-primary-200') +
                ` hover:border-navy-200 appearance-none ` +
                `bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10 ` +
                className
            }
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});
