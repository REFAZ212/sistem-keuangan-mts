import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { StatusBadge } from '@/Components/Badge';

function Field({ label, children }) {
    return (
        <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</dt>
            <dd className="mt-1.5 text-[14px] text-gray-800">{children}</dd>
        </div>
    );
}

export default function Show({ pengeluaran }) {
    const { post, processing } = useForm({});
    const handleApprove = () => post(route('pengeluaran.approve', pengeluaran.id));

    const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const formatNumber = (n) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: 2 });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Detail Pengeluaran</h1>
                        <p className="mt-0.5 text-[13px] text-gray-500">Informasi lengkap transaksi pengeluaran</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('pengeluaran.index')} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Kembali</Link>
                        {pengeluaran.status === 'draft' && (
                            <>
                                <Link href={route('pengeluaran.edit', pengeluaran.id)} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50">Edit</Link>
                                <button onClick={handleApprove} disabled={processing} className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-50">Setujui</button>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Detail Pengeluaran" />

            <div className="mx-auto max-w-2xl">
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-5">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Jumlah Pengeluaran</p>
                            <p className="mt-1 text-3xl font-bold text-rose-600">Rp {formatNumber(pengeluaran.jumlah)}</p>
                        </div>
                        <StatusBadge status={pengeluaran.status} />
                    </div>
                    <div className="p-6">
                        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                            <Field label="Nomor Transaksi">{pengeluaran.nomor_transaksi}</Field>
                            <Field label="Tanggal">{formatDate(pengeluaran.tanggal)}</Field>
                            <Field label="Rekening">{pengeluaran.account?.kode} - {pengeluaran.account?.nama}</Field>
                            <Field label="Dibuat Oleh">{pengeluaran.user?.name}</Field>
                            <Field label="Dibuat Pada">{formatDate(pengeluaran.created_at)}</Field>
                            <div className="sm:col-span-2"><Field label="Keterangan">{pengeluaran.keterangan || '-'}</Field></div>
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
