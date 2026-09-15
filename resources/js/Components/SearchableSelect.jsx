import { useState, useRef, useEffect } from 'react';

export default function SearchableSelect({
    options = [],
    value,
    onChange,
    placeholder = 'Pilih...',
    searchable = true,
    className = '',
    label,
    error,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef(null);
    const searchRef = useRef(null);

    const selectedOption = options.find(opt => String(opt.value) === String(value));

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchRef.current && searchable) {
            searchRef.current.focus();
        }
    }, [isOpen, searchable]);

    return (
        <div className={className}>
            {label && <label className="mb-1.5 block text-[13px] font-medium text-gray-700">{label}</label>}
            <div ref={containerRef} className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex w-full items-center justify-between rounded-xl border bg-white px-3.5 py-2.5 text-[13px] text-left transition-all ${
                        error ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    } ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}`}
                >
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <svg className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg">
                        {searchable && (
                            <div className="border-b border-gray-100 p-2">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari..."
                                    className="w-full rounded-lg border-0 bg-gray-50 px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        )}
                        <div className="max-h-60 overflow-y-auto py-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsOpen(false);
                                            setSearch('');
                                        }}
                                        className={`w-full px-3.5 py-2.5 text-left text-[13px] transition ${
                                            String(opt.value) === String(value)
                                                ? 'bg-blue-50 font-medium text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3.5 py-2.5 text-[13px] text-gray-400">Tidak ditemukan</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="mt-1.5 text-[12px] text-red-500">{error}</p>}
        </div>
    );
}
