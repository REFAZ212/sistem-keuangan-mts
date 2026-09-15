import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function Textarea(
    { className = '', error = false, rows = 3, isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            rows={rows}
            className={
                `w-full rounded-md border px-3 py-2 text-sm text-navy-700 placeholder:text-navy-400 transition-colors duration-200 resize-y ` +
                `focus:outline-none focus:ring-2 focus:ring-offset-0 ` +
                (error
                    ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-200'
                    : 'border-navy-200 focus:border-primary-500 focus:ring-primary-200') +
                ` hover:border-navy-200 ` +
                className
            }
            ref={localRef}
        />
    );
});
