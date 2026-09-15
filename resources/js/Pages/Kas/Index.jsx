import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Icon from '@/Components/Icons';

export default function Index({ kasSummary, filters }) {
    const { data, setData, get, processing } = useForm({
        date_from: filters.date_from || '', date_to: filters.date_to || '',
    });
    const formatCurrency = (num) => Number(num).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const total = kasSummary.total;

    const submit = (e) => { e.preventDefault(); get(route('kas.index'), { preserveState: true, preserveScroll: true }); };

    const cards = [
        { label: 'Saldo Awal', value: total.saldo_awal, icon: 'wallet', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Penerimaan', value: total.total_penerimaan, icon: 'arrow-down-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Pengeluaran', value: total.total_pengeluaran, icon: 'arrow-up-circle', color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Saldo Akhir', value: total.saldo_akhir, icon: 'target', color: 'text-violet-600', bg: 'bg-violet-50' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Data Kas</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Ringkasan saldo kas seluruh rekening</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('penerimaan.create')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                            <Icon name="plus" className="h-4 w-4" /> Pemasukan
                        </Link>
                        <Link href={route('pengeluaran.create')} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700">
                            <Icon name="plus" className="h-4 w-4" /> Pengeluaran
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Kas" />

            {/* Filter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
                    <div><InputLabel value="Dari" /><TextInput type="date" value={data.date_from} onChange={(e) => setData('date_from', e.target.value)} className="mt-1.5 block w-full sm:w-[150px]" /></div>
                    <div><InputLabel value="Sampai" /><TextInput type="date" value={data.date_to} onChange={(e) => setData('date_to', e.target.value)} className="mt-1.5 block w-full sm:w-[150px]" /></div>
                    <button type="submit" disabled={processing} className="rounded-xl bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50">Filter</button>
                    <button type="button" onClick={() => window.location.href = route('kas.index')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50">
                        <Icon name="x" className="h-3.5 w-3.5" /> Reset
                    </button>
                </form>
            </div>

            {/* Cards */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div key={card.label} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{card.label}</p>
                                <p className={`mt-2 text-2xl font-bold ${card.color}`}>Rp {formatCurrency(card.value)}</p>
                            </div>
                            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg} transition-transform duration-300 group-hover:scale-110`}>
                                <Icon name={card.icon} className={`h-5 w-5 ${card.color}`} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
