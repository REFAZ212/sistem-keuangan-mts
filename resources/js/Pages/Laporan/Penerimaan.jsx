import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Icon from '@/Components/Icons';

export default function Penerimaan({ laporan, accounts, filters }) {
    const { data, setData, get, processing } = useForm({ date_from: filters.date_from || '', date_to: filters.date_to || '', account_id: filters.account_id || '' });
    const submit = (e) => { e.preventDefault(); get(route('laporan.penerimaan'), { preserveState: true, preserveScroll: true }); };
    const fmt = (n) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: 2 });
    const fmtDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Laporan Penerimaan</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Daftar pemasukan yang sudah disetujui</p>
                    </div>
                    <div className="flex gap-2">
                        <a href={route('export.penerimaan.pdf', filters)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">
                            <Icon name="download" className="h-4 w-4" /> PDF
                        </a>
                        <a href={route('export.penerimaan.excel', filters)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">
                            <Icon name="download" className="h-4 w-4" /> Excel
                        </a>
                        <Link href={route('laporan.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Kembali</Link>
                    </div>
                </div>
            }
        >
            <Head title="Laporan Penerimaan" />

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
                    <div><InputLabel value="Dari" /><TextInput type="date" value={data.date_from} onChange={(e) => setData('date_from', e.target.value)} className="mt-1.5 block w-full sm:w-[150px]" /></div>
                    <div><InputLabel value="Sampai" /><TextInput type="date" value={data.date_to} onChange={(e) => setData('date_to', e.target.value)} className="mt-1.5 block w-full sm:w-[150px]" /></div>
                    <div>
                        <InputLabel value="Rekening" />
                        <select value={data.account_id} onChange={(e) => setData('account_id', e.target.value)} className="mt-1.5 block w-full sm:w-[180px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                            <option value="">Semua Rekening</option>
                            {accounts.map((acc) => <option key={acc.id} value={acc.id}>{acc.kode} - {acc.nama}</option>)}
                        </select>
                    </div>
                    <button type="submit" disabled={processing} className="rounded-xl bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50">Filter</button>
                    <button type="button" onClick={() => window.location.href = route('laporan.penerimaan')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50"><Icon name="x" className="h-3.5 w-3.5" /> Reset</button>
                </form>
            </div>

            <p className="mt-4 text-[13px] text-gray-500">
                Periode: {fmtDate(laporan.periode.dari)} — {fmtDate(laporan.periode.sampai)}
                {laporan.account && ` | Rekening: ${laporan.account}`}
            </p>

            <div className="mt-4 rounded-2xl border border-gray-100 bg-emerald-50 p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Total Penerimaan</p>
                <p className="mt-1 text-3xl font-bold text-emerald-700">Rp {fmt(laporan.total)}</p>
            </div>

            {laporan.penerimaan.length > 0 ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/80">
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">No. Transaksi</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Tanggal</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Rekening</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Jumlah</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Keterangan</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Oleh</th>
                                    <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {laporan.penerimaan.map((item) => (
                                    <tr key={item.id} className="transition hover:bg-gray-50/50">
                                        <td className="px-5 py-3.5 text-[13px] font-semibold text-gray-800">{item.nomor_transaksi}</td>
                                        <td className="px-5 py-3.5 text-[13px] text-gray-500">{fmtDate(item.tanggal)}</td>
                                        <td className="px-5 py-3.5 text-[13px] text-gray-500">{item.account?.kode} - {item.account?.nama}</td>
                                        <td className="px-5 py-3.5 text-right text-[13px] font-bold text-emerald-600">Rp {fmt(item.jumlah)}</td>
                                        <td className="px-5 py-3.5 text-[13px] text-gray-500">{item.keterangan || '-'}</td>
                                        <td className="px-5 py-3.5 text-[13px] text-gray-500">{item.user?.name}</td>
                                        <td className="px-5 py-3.5 text-center">
                                            <a href={route('export.kuitansi.penerimaan', item.id)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-600 transition hover:bg-gray-50">
                                                <Icon name="download" className="h-3 w-3" /> Kuitansi
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                    <Icon name="receipt" className="h-8 w-8 text-gray-300" />
                    <p className="mt-3 text-[14px] font-medium text-gray-400">Tidak ada data untuk periode ini</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
