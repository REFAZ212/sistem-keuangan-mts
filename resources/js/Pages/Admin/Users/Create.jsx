import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SearchableSelect from '@/Components/SearchableSelect';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ roles }) {
    const { data, setData, post, errors, processing } = useForm({
        name: '', email: '', password: '', password_confirmation: '', role_id: '', is_active: true,
    });

    const roleOptions = roles.map(r => ({ value: r.id, label: r.label }));

    const submit = (e) => { e.preventDefault(); post(route('admin.users.store')); };

    return (
        <AuthenticatedLayout header={<div><h1 className="text-xl font-bold text-gray-900">Tambah User</h1><p className="mt-0.5 text-[13px] text-gray-500">Buat akun pengguna baru</p></div>}>
            <Head title="Tambah User" />

            <div className="mx-auto max-w-2xl">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <InputLabel value="Nama Lengkap" />
                                <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1.5 block w-full" placeholder="Nama lengkap" />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="Email" />
                                <TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1.5 block w-full" placeholder="email@example.com" />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <InputLabel value="Password" />
                                <TextInput type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1.5 block w-full" placeholder="Minimal 8 karakter" />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="Konfirmasi Password" />
                                <TextInput type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="mt-1.5 block w-full" placeholder="Ulangi password" />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <SearchableSelect label="Role" options={roleOptions} value={data.role_id} onChange={(val) => setData('role_id', val)} placeholder="Pilih role..." error={errors.role_id} />
                            <div>
                                <InputLabel value="Status" />
                                <label className="mt-1.5 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5">
                                    <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-[13px] text-gray-700">Aktif</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan'}</PrimaryButton>
                            <Link href={route('admin.users.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
