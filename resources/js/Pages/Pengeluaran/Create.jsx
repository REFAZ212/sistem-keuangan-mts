import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Create({ accounts, kategori, nomorTransaksi }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nomor_transaksi: nomorTransaksi, tanggal: new Date().toISOString().split('T')[0],
        account_id: '', kategori_id: '', jumlah: '', keterangan: '', status: 'draft',
    });
    const submit = (e) => { e.preventDefault(); post(route('pengeluaran.store'), { onSuccess: () => reset() }); };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Tambah Pengeluaran</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Buat transaksi pengeluaran baru</p>
                    </div>
                    <Link href={route('pengeluaran.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Kembali</Link>
                </div>
            }
        >
            <Head title="Tambah Pengeluaran" />
            <div className="mx-auto max-w-2xl">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div><InputLabel value="Nomor Transaksi" /><TextInput value={data.nomor_transaksi} readOnly className="mt-1.5 block w-full bg-gray-50" /><InputError message={errors.nomor_transaksi} className="mt-1" /></div>
                        <div><InputLabel value="Tanggal" /><TextInput type="date" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} className="mt-1.5 block w-full" /><InputError message={errors.tanggal} className="mt-1" /></div>
                        <div>
                            <InputLabel value="Rekening Kas" />
                            <select value={data.account_id} onChange={(e) => setData('account_id', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                                <option value="">Pilih Rekening Kas</option>
                                {accounts.map((acc) => <option key={acc.id} value={acc.id}>{acc.kode} - {acc.nama} (Saldo: Rp {Number(acc.saldo || 0).toLocaleString('id-ID', {minimumFractionDigits: 2})})</option>)}
                            </select>
                            <InputError message={errors.account_id} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel value="Kategori" />
                            <select value={data.kategori_id} onChange={(e) => setData('kategori_id', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                                <option value="">Pilih Kategori</option>
                                {kategori.map((k) => <option key={k.id} value={k.id}>{k.nama}</option>)}
                            </select>
                            <InputError message={errors.kategori_id} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel value="Jumlah" />
                            <div className="relative mt-1.5">
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[13px] text-gray-400 font-medium">Rp</span>
                                <TextInput type="number" step="0.01" min="0" value={data.jumlah} onChange={(e) => setData('jumlah', e.target.value)} className="block w-full !pl-10" />
                            </div>
                            <InputError message={errors.jumlah} className="mt-1" />
                        </div>
                        <div><InputLabel value="Keterangan" /><textarea value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition resize-y min-h-[80px]" rows={3} /><InputError message={errors.keterangan} className="mt-1" /></div>
                        <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                            <input type="checkbox" checked={data.status === 'disetujui'} onChange={(e) => setData('status', e.target.checked ? 'disetujui' : 'draft')} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-[13px] leading-snug text-gray-600">Setujui sekaligus <span className="font-semibold text-gray-800">(tidak bisa diubah setelah disetujui)</span></span>
                        </label>
                        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                            <Link href={route('pengeluaran.index')} className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Batal</Link>
                            <button type="submit" disabled={processing} className="rounded-xl bg-rose-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:opacity-50">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
