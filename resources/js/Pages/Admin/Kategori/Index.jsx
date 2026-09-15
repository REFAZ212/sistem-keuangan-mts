import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import Icon from '@/Components/Icons';
import { useState } from 'react';

export default function Index({ kategori, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [tipeFilter, setTipeFilter] = useState(filters.tipe || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.kategori.index'), { search, tipe: tipeFilter }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (item) => {
        if (confirm(`Hapus kategori "${item.nama}"?`)) {
            router.delete(route('admin.kategori.destroy', item.id));
        }
    };

    const tipeBadge = (tipe) => tipe === 'pemasukan' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200';

    return (
        <AuthenticatedLayout header={<div><h1 className="text-xl font-bold text-gray-900">Kategori Keuangan</h1><p className="mt-0.5 text-[13px] text-gray-500">Kelola kategori transaksi keuangan</p></div>}>
            <Head title="Kategori Keuangan" />

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3">
                    <div className="flex-1"><TextInput type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama kategori..." className="block w-full" /></div>
                    <div>
                        <select value={tipeFilter} onChange={(e) => setTipeFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                            <option value="">Semua Tipe</option>
                            <option value="pemasukan">Pemasukan</option>
                            <option value="pengeluaran">Pengeluaran</option>
                        </select>
                    </div>
                    <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Cari</button>
                </form>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-[13px] text-gray-500">{kategori.total} kategori</p>
                <Link href={route('admin.kategori.create')} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                    <Icon name="plus" className="h-4 w-4" /> Tambah Kategori
                </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {kategori.data.map(item => (
                    <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tipeBadge(item.tipe)}`}>
                                    {item.tipe}
                                </span>
                                <h3 className="mt-2 text-[15px] font-bold text-gray-900">{item.nama}</h3>
                                {item.deskripsi && <p className="mt-1 text-[12px] text-gray-400">{item.deskripsi}</p>}
                            </div>
                            <span className={`h-2 w-2 rounded-full ${item.is_active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Link href={route('admin.kategori.edit', item.id)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 transition hover:bg-gray-50">
                                <Icon name="edit" className="h-3 w-3" /> Edit
                            </Link>
                            <button onClick={() => handleDelete(item)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-[11px] font-medium text-red-600 transition hover:bg-red-50">
                                <Icon name="trash" className="h-3 w-3" /> Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {kategori.last_page > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {kategori.links.map((link, i) => (
                        link.url ? (
                            <Link key={i} href={link.url} className={`inline-flex items-center rounded-lg px-3 py-2 text-[12px] font-medium transition ${link.active ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ) : (
                            <span key={i} className="inline-flex items-center rounded-lg px-3 py-2 text-[12px] text-gray-300" dangerouslySetInnerHTML={{ __html: link.label }} />
                        )
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
