import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Icon from '@/Components/Icons';

export default function Edit({ penerimaan, accounts, kategori }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        nomor_transaksi: penerimaan.nomor_transaksi,
        tanggal: penerimaan.tanggal,
        account_id: penerimaan.account_id,
        kategori_id: penerimaan.kategori_id || '',
        jumlah: penerimaan.jumlah,
        keterangan: penerimaan.keterangan || '',
        status: penerimaan.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('penerimaan.update', penerimaan.id), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Edit Penerimaan</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Ubah data transaksi pemasukan</p>
                    </div>
                    <Link href={route('penerimaan.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Edit Penerimaan" />

            <div className="mx-auto max-w-2xl">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="nomor_transaksi" value="Nomor Transaksi" />
                            <TextInput id="nomor_transaksi" value={data.nomor_transaksi} readOnly className="mt-1.5 block w-full bg-gray-50" />
                            <InputError message={errors.nomor_transaksi} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="tanggal" value="Tanggal" />
                            <TextInput id="tanggal" type="date" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} className="mt-1.5 block w-full" />
                            <InputError message={errors.tanggal} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="account_id" value="Rekening" />
                            <select id="account_id" value={data.account_id} onChange={(e) => setData('account_id', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                                <option value="">Pilih Rekening</option>
                                {accounts.map((acc) => (
                                    <option key={acc.id} value={acc.id}>{acc.kode} - {acc.nama}</option>
                                ))}
                            </select>
                            <InputError message={errors.account_id} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="kategori_id" value="Kategori" />
                            <select id="kategori_id" value={data.kategori_id} onChange={(e) => setData('kategori_id', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
                                <option value="">Pilih Kategori</option>
                                {kategori.map((k) => (
                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                ))}
                            </select>
                            <InputError message={errors.kategori_id} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="jumlah" value="Jumlah" />
                            <div className="relative mt-1.5">
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[13px] text-gray-400 font-medium">Rp</span>
                                <TextInput id="jumlah" type="number" step="0.01" min="0" value={data.jumlah} onChange={(e) => setData('jumlah', e.target.value)} className="block w-full !pl-10" />
                            </div>
                            <InputError message={errors.jumlah} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="keterangan" value="Keterangan" />
                            <textarea id="keterangan" value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition resize-y min-h-[80px]" rows={3} />
                            <InputError message={errors.keterangan} className="mt-1" />
                        </div>
                        <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                            <input type="checkbox" checked={data.status === 'disetujui'} onChange={(e) => setData('status', e.target.checked ? 'disetujui' : 'draft')} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-[13px] leading-snug text-gray-600">
                                Setujui <span className="font-semibold text-gray-800">(tidak bisa diubah setelah disetujui)</span>
                            </span>
                        </label>
                        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                            <Link href={route('penerimaan.index')} className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Batal</Link>
                            <button type="submit" disabled={processing} className="rounded-xl bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
