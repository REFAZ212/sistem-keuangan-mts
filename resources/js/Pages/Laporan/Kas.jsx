import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Icon from '@/Components/Icons';

export default function Kas({ laporan, filters }) {
    const { data, setData, get, processing } = useForm({ date_from: filters.date_from || '', date_to: filters.date_to || '' });
    const submit = (e) => { e.preventDefault(); get(route('laporan.kas'), { preserveState: true, preserveScroll: true }); };
    const fmt = (n) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: 2 });
    const fmtDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
    const gt = laporan.grand_total;

    const summary = [
        { label: 'Saldo Awal', value: gt.saldo_awal, color: 'text-gray-900', bg: 'bg-gray-50' },
        { label: 'Total Penerimaan', value: gt.total_penerimaan, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Pengeluaran', value: gt.total_pengeluaran, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Saldo Akhir', value: gt.saldo_akhir, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Laporan Kas</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Rekapitulasi saldo kas per rekening</p>
                    </div>
                    <div className="flex gap-2">
                        <a href={route('export.kas.pdf', filters)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">
                            <Icon name="download" className="h-4 w-4" /> PDF
                        </a>
                        <a href={route('export.kas.excel', filters)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">
                            <Icon name="download" className="h-4 w-4" /> Excel
                        </a>
                        <Link href={route('laporan.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Kembali</Link>
                    </div>
                </div>
            }
        >
            <Head title="Laporan Kas" />

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
                    <div><InputLabel value="Dari" /><TextInput type="date" value={data.date_from} onChange={(e) => setData('date_from', e.target.value)} className="mt-1.5 block w-full sm:w-[150px]" /></div>
                    <div><InputLabel value="Sampai" /><TextInput type="date" value={data.date_to} onChange={(e) => setData('date_to', e.target.value)} className="mt-1.5 block w-full sm:w-[150px]" /></div>
                    <button type="submit" disabled={processing} className="rounded-xl bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50">Filter</button>
                    <button type="button" onClick={() => window.location.href = route('laporan.kas')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50"><Icon name="x" className="h-3.5 w-3.5" /> Reset</button>
                </form>
            </div>

            <p className="mt-4 text-[13px] text-gray-500">Periode: {fmtDate(laporan.periode.dari)} — {fmtDate(laporan.periode.sampai)}</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summary.map((s) => (
                    <div key={s.label} className={`rounded-2xl border border-gray-100 ${s.bg} p-5 shadow-sm`}>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{s.label}</p>
                        <p className={`mt-1.5 text-2xl font-bold ${s.color}`}>Rp {fmt(s.value)}</p>
                    </div>
                ))}
            </div>

            {laporan.accounts.length > 0 && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/80">
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Rekening</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Saldo Awal</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Penerimaan</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Pengeluaran</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Saldo Akhir</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {laporan.accounts.map((item) => (
                                    <tr key={item.account.id} className="transition hover:bg-gray-50/50">
                                        <td className="px-5 py-3.5 text-[13px] font-semibold text-gray-800">{item.account.kode} - {item.account.nama}</td>
                                        <td className="px-5 py-3.5 text-right text-[13px] text-gray-500">Rp {fmt(item.saldo_awal)}</td>
                                        <td className="px-5 py-3.5 text-right text-[13px] font-medium text-emerald-600">Rp {fmt(item.total_penerimaan)}</td>
                                        <td className="px-5 py-3.5 text-right text-[13px] font-medium text-rose-600">Rp {fmt(item.total_pengeluaran)}</td>
                                        <td className="px-5 py-3.5 text-right text-[13px] font-bold text-blue-600">Rp {fmt(item.saldo_akhir)}</td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-50 font-bold">
                                    <td className="px-5 py-3.5 text-[13px] text-gray-800">TOTAL</td>
                                    <td className="px-5 py-3.5 text-right text-[13px] text-gray-800">Rp {fmt(gt.saldo_awal)}</td>
                                    <td className="px-5 py-3.5 text-right text-[13px] text-emerald-700">Rp {fmt(gt.total_penerimaan)}</td>
                                    <td className="px-5 py-3.5 text-right text-[13px] text-rose-700">Rp {fmt(gt.total_pengeluaran)}</td>
                                    <td className="px-5 py-3.5 text-right text-[13px] text-blue-700">Rp {fmt(gt.saldo_akhir)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
