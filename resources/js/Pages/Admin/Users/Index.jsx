import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import Icon from '@/Components/Icons';
import { useState } from 'react';

export default function Index({ users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role_id || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search, role_id: roleFilter }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (user) => {
        if (confirm(`Hapus user "${user.name}"?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const roleBadge = (roleName) => {
        const styles = { admin: 'bg-purple-50 text-purple-700 border-purple-200', bendahara: 'bg-blue-50 text-blue-700 border-blue-200', pengawas: 'bg-amber-50 text-amber-700 border-amber-200' };
        return styles[roleName] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    return (
        <AuthenticatedLayout header={<div><h1 className="text-xl font-bold text-gray-900">Manajemen User</h1><p className="mt-0.5 text-[13px] text-gray-500">Kelola akun pengguna sistem</p></div>}>
            <Head title="Manajemen User" />

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3">
                    <div className="flex-1">
                        <TextInput type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau email..." className="block w-full" />
                    </div>
                    <div>
                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                            <option value="">Semua Role</option>
                            {roles.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Cari</button>
                </form>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-[13px] text-gray-500">{users.total} user ditemukan</p>
                <Link href={route('admin.users.create')} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                    <Icon name="plus" className="h-4 w-4" /> Tambah User
                </Link>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/80">
                                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Nama</th>
                                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Email</th>
                                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Role</th>
                                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                                <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data.map(user => (
                                <tr key={user.id} className="transition hover:bg-gray-50/50">
                                    <td className="px-5 py-3.5 text-[13px] font-semibold text-gray-800">{user.name}</td>
                                    <td className="px-5 py-3.5 text-[13px] text-gray-500">{user.email}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${roleBadge(user.role?.name)}`}>
                                            {user.role?.label || '-'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${user.is_active ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                            {user.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.users.edit', user.id)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 transition hover:bg-gray-50">
                                                <Icon name="edit" className="h-3 w-3" /> Edit
                                            </Link>
                                            <button onClick={() => handleDelete(user)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-[11px] font-medium text-red-600 transition hover:bg-red-50">
                                                <Icon name="trash" className="h-3 w-3" /> Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {users.last_page > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {users.links.map((link, i) => (
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
