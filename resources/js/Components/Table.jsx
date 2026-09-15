import { colors, borderRadius, shadows, transitions, fontSize, fontWeight } from '@/designSystem';

export default function Table({
    className = '',
    columns,
    data,
    keyExtractor = (row) => row.id,
    onRowClick,
    emptyMessage = 'Tidak ada data',
    striped = true,
    hoverable = true,
    pagination,
    onPageChange,
    sorting,
    onSort,
}) {
    return (
        <div className={`overflow-x-auto rounded-xl border border-gray-200 ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className={`px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors ${column.className || ''}`}
                                onClick={() => column.sortable && onSort?.(column.key)}
                                style={{ width: column.width }}
                            >
                                <div className="flex items-center gap-1">
                                    {column.label}
                                    {column.sortable && sorting?.key === column.key && (
                                        <span>
                                            {sorting.direction === 'asc' ? ' ▲' : ' ▼'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={keyExtractor(row)}
                                className={`${hoverable ? 'hover:bg-gray-50' : ''} ${striped ? 'even:bg-gray-50' : ''} transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((column) => (
                                    <td key={column.key} className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}>
                                        {column.render ? column.render(row, row[column.key]) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {pagination && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Menampilkan {pagination.from} sampai {pagination.to} dari {pagination.total} data
                        </div>
                        <div className="flex gap-2">
                            {pagination.prev_page_url && (
                                <button
                                    onClick={() => onPageChange(pagination.current_page - 1)}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Sebelumnya
                                </button>
                            )}
                            {pagination.next_page_url && (
                                <button
                                    onClick={() => onPageChange(pagination.current_page + 1)}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Selanjutnya
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function TableColumn({ key, label, render, className = '', width, sortable = false }) {
    return null;
}