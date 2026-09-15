import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { StatusBadge } from '@/Components/Badge';
import Icon from '@/Components/Icons';
import { useState } from 'react';

export default function Index({ pengeluaran, accounts, filters }) {
    const [deleteId, setDeleteId] = useState(null);
    const [approveId, setApproveId] = useState(null);
    const { data, setData, post, delete: destroy, processing } = useForm({});

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('pengeluaran.destroy', deleteId), { onSuccess: () => setDeleteId(null) });
    };
    const handleApprove = (e) => {
        e.preventDefault();
        post(route('pengeluaran.approve', approveId), { onSuccess: () => setApproveId(null) });
    };

    const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const formatNumber = (n) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: 2 });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Data Pengeluaran</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Kelola seluruh transaksi pengeluaran</p>
                    </div>
                    <Link href={route('pengeluaran.create')} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700">
                        <Icon name="plus" className="h-4 w-4" />
                        Tambah Pengeluaran
                    </Link>
                </div>
            }
        >
            <Head title="Pengeluaran" />

            {/* Filter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-wrap items-end gap-3">
                    <div className="w-full sm:w-auto">
                        <InputLabel htmlFor="status" value="Status" />
                        <select id="status" value={filters.status || ''} onChange={(e) => setData('status', e.target.value)} className="mt-1.5 block w-full sm:w-[140px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                            <option value="">Semua</option>
                            <option value="draft">Draft</option>
                            <option value="disetujui">Disetujui</option>
                        </select>
                    </div>
                    <div className="w-full sm:w-auto">
                        <InputLabel htmlFor="account_id" value="Rekening" />
                        <select id="account_id" value={filters.account_id || ''} onChange={(e) => setData('account_id', e.target.value)} className="mt-1.5 block w-full sm:w-[180px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                            <option value="">Semua</option>
                            {accounts.map((acc) => <option key={acc.id} value={acc.id}>{acc.kode} - {acc.nama}</option>)}
                        </select>
                    </div>
                    <div className="w-full sm:w-auto">
                        <InputLabel htmlFor="date_from" value="Dari" />
                        <TextInput id="date_from" type="date" value={filters.date_from || ''} className="mt-1.5 block w-full sm:w-[150px]" onChange={(e) => setData('date_from', e.target.value)} />
                    </div>
                    <div className="w-full sm:w-auto">
                        <InputLabel htmlFor="date_to" value="Sampai" />
                        <TextInput id="date_to" type="date" value={filters.date_to || ''} className="mt-1.5 block w-full sm:w-[150px]" onChange={(e) => setData('date_to', e.target.value)} />
                    </div>
                    <button type="button" onClick={() => window.location.href = route('pengeluaran.index')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50">
                        <Icon name="x" className="h-3.5 w-3.5" /> Reset
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                {pengeluaran.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                            <Icon name="receipt" className="h-7 w-7 text-gray-300" />
                        </div>
                        <p className="mt-5 text-[15px] font-semibold text-gray-700">Belum ada data pengeluaran</p>
                        <p className="mt-1 text-[13px] text-gray-400 max-w-[280px]">Data akan muncul di sini setelah Anda menambahkan transaksi pengeluaran.</p>
                        <Link href={route('pengeluaran.create')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700">
                            <Icon name="plus" className="h-4 w-4" /> Tambah Pengeluaran
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/80">
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">No. Transaksi</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Tanggal</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Rekening</th>
                                        <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Jumlah</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Keterangan</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Oleh</th>
                                        <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pengeluaran.data.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-gray-50/50">
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[13px] font-semibold text-gray-800">{item.nomor_transaksi}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[13px] text-gray-500">{formatDate(item.tanggal)}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[13px] text-gray-500">{item.account?.kode} - {item.account?.nama}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-right text-[13px] font-bold text-rose-600">Rp {formatNumber(item.jumlah)}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[13px] text-gray-500">{item.keterangan || '-'}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5"><StatusBadge status={item.status} /></td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-[13px] text-gray-500">{item.user?.name}</td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link href={route('pengeluaran.show', item.id)} className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50">Lihat</Link>
                                                    {item.status === 'draft' ? (
                                                        <>
                                                            <Link href={route('pengeluaran.edit', item.id)} className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700">Edit</Link>
                                                            <button type="button" onClick={() => setApproveId(item.id)} className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-emerald-600 transition hover:bg-emerald-50">Setujui</button>
                                                            <button type="button" onClick={() => setDeleteId(item.id)} className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-rose-500 transition hover:bg-rose-50">Hapus</button>
                                                        </>
                                                    ) : <span className="px-2.5 py-1.5 text-[11px] text-gray-300">Selesai</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {pengeluaran.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                                <p className="text-[12px] text-gray-400">Menampilkan {pengeluaran.from}–{pengeluaran.to} dari {pengeluaran.total} data</p>
                                <div className="flex gap-1.5">
                                    {pengeluaran.prev_page_url && <Link href={pengeluaran.prev_page_url} className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-600 transition hover:bg-gray-50">Sebelumnya</Link>}
                                    {pengeluaran.next_page_url && <Link href={pengeluaran.next_page_url} className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-600 transition hover:bg-gray-50">Selanjutnya</Link>}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modals */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50"><Icon name="alert-circle" className="h-6 w-6 text-rose-500" /></div>
                            <h3 className="mt-4 text-[16px] font-bold text-gray-900">Hapus Pengeluaran</h3>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
                            <button onClick={() => setDeleteId(null)} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Batal</button>
                            <form onSubmit={handleDelete}><button type="submit" disabled={processing} className="rounded-xl bg-rose-600 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:opacity-50">Hapus</button></form>
                        </div>
                    </div>
                </div>
            )}
            {approveId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setApproveId(null)} />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50"><Icon name="check-circle" className="h-6 w-6 text-emerald-500" /></div>
                            <h3 className="mt-4 text-[16px] font-bold text-gray-900">Setujui Pengeluaran</h3>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">Data yang sudah disetujui tidak dapat diubah atau dihapus. Lanjutkan?</p>
                        </div>
                        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
                            <button onClick={() => setApproveId(null)} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Batal</button>
                            <form onSubmit={handleApprove}><button type="submit" disabled={processing} className="rounded-xl bg-emerald-600 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-50">Setujui</button></form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
