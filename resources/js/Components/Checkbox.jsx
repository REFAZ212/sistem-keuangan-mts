export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-navy-200 text-primary-600 shadow-sm focus:ring-primary-500 ' +
                className
            }
        />
    );
}
