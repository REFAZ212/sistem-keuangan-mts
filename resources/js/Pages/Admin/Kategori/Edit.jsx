import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ kategori }) {
    const { data, setData, put, errors, processing } = useForm({ nama: kategori.nama, tipe: kategori.tipe, deskripsi: kategori.deskripsi || '', is_active: kategori.is_active });

    const submit = (e) => { e.preventDefault(); put(route('admin.kategori.update', kategori.id)); };

    return (
        <AuthenticatedLayout header={<div><h1 className="text-xl font-bold text-gray-900">Edit Kategori</h1><p className="mt-0.5 text-[13px] text-gray-500">Perbarui informasi kategori</p></div>}>
            <Head title={`Edit - ${kategori.nama}`} />
            <div className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel value="Nama Kategori" />
                            <TextInput value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="mt-1.5 block w-full" />
                            <InputError message={errors.nama} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Tipe" />
                            <select value={data.tipe} onChange={(e) => setData('tipe', e.target.value)} className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option value="pemasukan">Pemasukan</option>
                                <option value="pengeluaran">Pengeluaran</option>
                            </select>
                            <InputError message={errors.tipe} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Deskripsi" />
                            <TextInput value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="mt-1.5 block w-full" />
                            <InputError message={errors.deskripsi} className="mt-2" />
                        </div>
                        <div>
                            <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5">
                                <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-[13px] text-gray-700">Aktif</span>
                            </label>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</PrimaryButton>
                            <Link href={route('admin.kategori.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
