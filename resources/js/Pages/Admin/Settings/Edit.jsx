import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ settings }) {
    const { data, setData, post, errors, processing } = useForm({
        nama_sekolah: settings.nama_sekolah || '',
        alamat: settings.alamat || '',
        telepon: settings.telepon || '',
        email_sekolah: settings.email_sekolah || '',
        website: settings.website || '',
        kepala_sekolah: settings.kepala_sekolah || '',
        nip_kepala_sekolah: settings.nip_kepala_sekolah || '',
        bendahara_nama: settings.bendahara_nama || '',
        bendahara_nip: settings.bendahara_nip || '',
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });
        formData.append('_method', 'PUT');
        post(route('settings.update'), { formData, forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<div><h1 className="text-xl font-bold text-gray-900">Pengaturan Sistem</h1><p className="mt-0.5 text-[13px] text-gray-500">Konfigurasi informasi sekolah dan aplikasi</p></div>}>
            <Head title="Pengaturan" />

            <div className="mx-auto max-w-3xl space-y-6">
                <form onSubmit={submit} className="space-y-6">
                    {/* Informasi Sekolah */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-[15px] font-bold text-gray-900">Informasi Sekolah</h3>
                        <p className="mt-0.5 text-[12px] text-gray-400">Informasi dasar lembaga pendidikan</p>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <InputLabel value="Nama Sekolah/Madrasah" />
                                <TextInput value={data.nama_sekolah} onChange={(e) => setData('nama_sekolah', e.target.value)} className="mt-1.5 block w-full" placeholder="Nama lengkap sekolah" />
                                <InputError message={errors.nama_sekolah} className="mt-2" />
                            </div>
                            <div className="sm:col-span-2">
                                <InputLabel value="Alamat" />
                                <TextInput value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} className="mt-1.5 block w-full" placeholder="Alamat lengkap" />
                                <InputError message={errors.alamat} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="Telepon" />
                                <TextInput value={data.telepon} onChange={(e) => setData('telepon', e.target.value)} className="mt-1.5 block w-full" placeholder="021-xxxxxxx" />
                                <InputError message={errors.telepon} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="Email" />
                                <TextInput type="email" value={data.email_sekolah} onChange={(e) => setData('email_sekolah', e.target.value)} className="mt-1.5 block w-full" placeholder="info@sekolah.sch.id" />
                                <InputError message={errors.email_sekolah} className="mt-2" />
                            </div>
                            <div className="sm:col-span-2">
                                <InputLabel value="Website" />
                                <TextInput value={data.website} onChange={(e) => setData('website', e.target.value)} className="mt-1.5 block w-full" placeholder="https://sekolah.sch.id" />
                                <InputError message={errors.website} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Pejabat */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-[15px] font-bold text-gray-900">Pejabat Sekolah</h3>
                        <p className="mt-0.5 text-[12px] text-gray-400">Data untuk kop surat dan tanda tangan</p>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <div>
                                <InputLabel value="Kepala Madrasah" />
                                <TextInput value={data.kepala_sekolah} onChange={(e) => setData('kepala_sekolah', e.target.value)} className="mt-1.5 block w-full" placeholder="Nama kepala sekolah" />
                                <InputError message={errors.kepala_sekolah} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="NIP Kepala Madrasah" />
                                <TextInput value={data.nip_kepala_sekolah} onChange={(e) => setData('nip_kepala_sekolah', e.target.value)} className="mt-1.5 block w-full" placeholder="NIP" />
                                <InputError message={errors.nip_kepala_sekolah} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="Bendahara" />
                                <TextInput value={data.bendahara_nama} onChange={(e) => setData('bendahara_nama', e.target.value)} className="mt-1.5 block w-full" placeholder="Nama bendahara" />
                                <InputError message={errors.bendahara_nama} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="NIP Bendahara" />
                                <TextInput value={data.bendahara_nip} onChange={(e) => setData('bendahara_nip', e.target.value)} className="mt-1.5 block w-full" placeholder="NIP" />
                                <InputError message={errors.bendahara_nip} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-[15px] font-bold text-gray-900">Logo Sekolah</h3>
                        <p className="mt-0.5 text-[12px] text-gray-400">Logo untuk kop surat dan header aplikasi</p>
                        <div className="mt-4">
                            <input type="file" accept="image/*" onChange={(e) => setData('logo', e.target.files[0])} className="block w-full text-[13px] text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-blue-700 hover:file:bg-blue-100" />
                            <InputError message={errors.logo} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan Pengaturan'}</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
