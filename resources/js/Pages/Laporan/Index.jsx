import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Icon from '@/Components/Icons';

export default function Index() {
    const reports = [
        { label: 'Laporan Kas', desc: 'Rekapitulasi saldo kas per rekening', route: 'laporan.kas', icon: 'wallet', color: 'text-blue-600', bg: 'bg-blue-50', hoverBg: 'group-hover:bg-blue-100', gradient: 'from-blue-500 to-blue-600' },
        { label: 'Laporan Penerimaan', desc: 'Daftar pemasukan yang sudah disetujui', route: 'laporan.penerimaan', icon: 'arrow-down-circle', color: 'text-emerald-600', bg: 'bg-emerald-50', hoverBg: 'group-hover:bg-emerald-100', gradient: 'from-emerald-500 to-emerald-600' },
        { label: 'Laporan Pengeluaran', desc: 'Daftar pengeluaran yang sudah disetujui', route: 'laporan.pengeluaran', icon: 'arrow-up-circle', color: 'text-rose-600', bg: 'bg-rose-50', hoverBg: 'group-hover:bg-rose-100', gradient: 'from-rose-500 to-rose-600' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Laporan Keuangan</h1>
                    <p className="mt-0.5 text-[13px] text-gray-500">Akses dan ekspor berbagai laporan keuangan</p>
                </div>
            }
        >
            <Head title="Laporan" />

            <div className="grid gap-4 md:grid-cols-3">
                {reports.map((r) => (
                    <Link key={r.route} href={route(r.route)}>
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                            <div className="flex items-start gap-4">
                                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${r.bg} ${r.hoverBg} transition-colors duration-300`}>
                                    <Icon name={r.icon} className={`h-6 w-6 ${r.color}`} />
                                </span>
                                <div>
                                    <h3 className={`text-[15px] font-bold text-gray-900 transition-colors ${r.color}`}>{r.label}</h3>
                                    <p className="mt-1 text-[12px] text-gray-400 leading-relaxed">{r.desc}</p>
                                </div>
                            </div>
                            <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${r.gradient} transition-all duration-500 group-hover:w-full`} />
                        </div>
                    </Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
