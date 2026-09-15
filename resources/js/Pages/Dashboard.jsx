import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Icon from '@/Components/Icons';

export default function Dashboard({ kasSummary }) {
    const total = kasSummary.total;
    const accounts = kasSummary.accounts;

    const formatCurrency = (num) =>
        Number(num).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const summaryCards = [
        {
            label: 'Total Saldo Awal',
            value: total.saldo_awal,
            icon: 'wallet',
            gradient: 'from-blue-500 to-blue-600',
            shadow: 'shadow-blue-500/20',
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Total Penerimaan',
            value: total.total_penerimaan,
            icon: 'arrow-down-circle',
            gradient: 'from-emerald-500 to-emerald-600',
            shadow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
        },
        {
            label: 'Total Pengeluaran',
            value: total.total_pengeluaran,
            icon: 'arrow-up-circle',
            gradient: 'from-rose-500 to-rose-600',
            shadow: 'shadow-rose-500/20',
            textColor: 'text-rose-600',
            bgColor: 'bg-rose-50',
        },
        {
            label: 'Saldo Akhir',
            value: total.saldo_akhir,
            icon: 'target',
            gradient: 'from-violet-500 to-violet-600',
            shadow: 'shadow-violet-500/20',
            textColor: 'text-violet-600',
            bgColor: 'bg-violet-50',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Dashboard Keuangan</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Ringkasan data keuangan terkini</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route('penerimaan.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
                        >
                            <Icon name="plus" className="h-4 w-4" />
                            Pemasukan
                        </Link>
                        <Link
                            href={route('pengeluaran.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-600/30"
                        >
                            <Icon name="plus" className="h-4 w-4" />
                            Pengeluaran
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <div
                        key={card.label}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{card.label}</p>
                                <p className={`mt-2 text-2xl font-bold ${card.textColor}`}>
                                    Rp {formatCurrency(card.value)}
                                </p>
                            </div>
                            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                                <Icon name={card.icon} className={`h-5 w-5 ${card.textColor}`} />
                            </span>
                        </div>
                        <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                    </div>
                ))}
            </div>

            {/* Chart & Table */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Chart Area */}
                <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-[15px] font-bold text-gray-900">Arus Kas Bulanan</h3>
                            <p className="text-[12px] text-gray-400 mt-0.5">Perbandingan pemasukan vs pengeluaran</p>
                        </div>
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-[11px] font-semibold text-gray-600">
                            Chart
                        </span>
                    </div>
                    <div className="flex h-[240px] items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                        <div className="text-center">
                            <Icon name="calendar" className="mx-auto h-8 w-8 text-gray-300" />
                            <p className="mt-2 text-[13px] font-medium text-gray-400">Visualisasi arus kas</p>
                            <p className="text-[11px] text-gray-300">Data akan ditampilkan di sini</p>
                        </div>
                    </div>
                </div>

                {/* Detail Rekening Table */}
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <h3 className="text-[15px] font-bold text-gray-900">Detail Rekening</h3>
                        <p className="text-[12px] text-gray-400 mt-0.5">Saldo per rekening kas</p>
                    </div>
                    <div className="overflow-y-auto max-h-[300px]">
                        <table className="min-w-full">
                            <thead className="sticky top-0 bg-gray-50">
                                <tr>
                                    <th className="px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Rekening</th>
                                    <th className="px-5 py-2.5 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">Saldo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {accounts.map((item) => (
                                    <tr key={item.account.id} className="transition hover:bg-gray-50/50">
                                        <td className="whitespace-nowrap px-5 py-3">
                                            <div className="text-[12px] font-semibold text-gray-700">{item.account.nama}</div>
                                            <div className="text-[11px] text-gray-400">{item.account.kode}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3 text-right">
                                            <span className="text-[13px] font-bold text-gray-900">
                                                Rp {formatCurrency(item.saldo_akhir)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
