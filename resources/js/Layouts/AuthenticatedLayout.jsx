import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Icon from '@/Components/Icons';

function FlashMessage() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setShow(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setShow(true);
        }
    }, [flash]);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => setShow(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5">
            <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
                type === 'success' ? 'border-emerald-200 bg-emerald-50/90 text-emerald-700' : 'border-red-200 bg-red-50/90 text-red-700'
            }`}>
                <Icon name={type === 'success' ? 'check-circle' : 'alert-circle'} className="h-5 w-5 shrink-0" />
                <p className="text-[13px] font-medium">{message}</p>
                <button onClick={() => setShow(false)} className="ml-2 shrink-0 rounded-lg p-0.5 hover:bg-white/50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
}

const NAV_ITEMS = [
    { type: 'link', label: 'Dashboard', route: 'dashboard', icon: 'dashboard' },
    { type: 'section', label: 'KEUANGAN' },
    { type: 'link', label: 'Pemasukan', route: 'penerimaan.index', icon: 'arrow-down-circle' },
    { type: 'link', label: 'Pengeluaran', route: 'pengeluaran.index', icon: 'arrow-up-circle' },
    { type: 'link', label: 'Kas', route: 'kas.index', icon: 'wallet' },
    { type: 'section', label: 'LAPORAN' },
    { type: 'link', label: 'Laporan Keuangan', route: 'laporan.index', icon: 'file-text' },
    { type: 'section', label: 'ADMIN', roles: ['admin'] },
    { type: 'link', label: 'Manajemen User', route: 'admin.users.index', icon: 'users', roles: ['admin'] },
    { type: 'link', label: 'Kategori Keuangan', route: 'admin.kategori.index', icon: 'target', roles: ['admin'] },
    { type: 'link', label: 'Pengaturan', route: 'settings.edit', icon: 'settings', roles: ['admin'] },
];

function safeRouteUrl(name) {
    try { return route(name); } catch { return '#'; }
}

function isActiveRoute(name) {
    try { return route().current(name) || route().current(`${name}.*`); } catch { return false; }
}

function SidebarContent({ collapsed, onNavigate, userRoles }) {
    const filteredItems = NAV_ITEMS.filter(item => {
        if (item.roles && item.roles.length > 0) {
            return item.roles.some(role => userRoles.includes(role));
        }
        return true;
    });

    return (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center px-2' : ''}`}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                        <path d="M12 3.5 3 8l9 4.5 9-4.5-9-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M6.5 10.3V15c0 1.4 2.46 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 9v5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </div>
                {!collapsed && (
                    <div className="leading-tight overflow-hidden">
                        <p className="text-[13px] font-bold text-white tracking-tight">MTs Subhanul Yaum</p>
                        <p className="text-[10px] text-slate-400 font-medium">Sistem Keuangan</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide">
                <ul className="space-y-1">
                    {filteredItems.map((item, idx) =>
                        item.type === 'section' ? (
                            <li key={idx} className={`${collapsed ? 'px-1' : 'px-3'} pt-5 pb-1.5 first:pt-1`}>
                                {!collapsed && (
                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ) : (
                            <li key={idx}>
                                <Link
                                    href={safeRouteUrl(item.route)}
                                    onClick={onNavigate}
                                    title={collapsed ? item.label : undefined}
                                    className={`group flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                                        collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
                                    } ${
                                        isActiveRoute(item.route)
                                            ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Icon
                                        name={item.icon}
                                        className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                                            isActiveRoute(item.route) ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                                        }`}
                                    />
                                    {!collapsed && <span>{item.label}</span>}
                                    {isActiveRoute(item.route) && !collapsed && (
                                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                                    )}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="border-t border-white/5 px-4 py-3">
                    <p className="text-[10px] text-slate-600">© {new Date().getFullYear()} MTs Subhanul Yaum</p>
                </div>
            )}
        </div>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? { name: 'Administrator', role: 'Admin' };
    const initials = (user.name || 'A').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    // Auto-collapse on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarCollapsed(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#f0f2f5] font-sans">
            <FlashMessage />
            {/* Sidebar — Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 bg-[#0f172a] transition-all duration-300 ease-in-out lg:block ${
                    sidebarCollapsed ? 'w-[72px]' : 'w-[250px]'
                }`}
            >
                <SidebarContent collapsed={sidebarCollapsed} onNavigate={() => setMobileNavOpen(false)} userRoles={user?.roles || []} />
            </aside>

            {/* Sidebar — Mobile Overlay */}
            {mobileNavOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-[250px] bg-[#0f172a] shadow-2xl">
                        <SidebarContent collapsed={false} onNavigate={() => setMobileNavOpen(false)} userRoles={user?.roles || []} />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className={`transition-all duration-300 ease-in-out min-h-screen flex flex-col ${sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[250px]'}`}>
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-gray-200/80 bg-white/80 backdrop-blur-xl px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    setMobileNavOpen(true);
                                } else {
                                    setSidebarCollapsed(c => !c);
                                }
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                            aria-label="Toggle sidebar"
                        >
                            <Icon name="menu" className="h-5 w-5" />
                        </button>

                        {/* Global Search */}
                        <div className="hidden sm:block relative">
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        router.get(route('dashboard'), { search: e.target.value.trim() });
                                    }
                                }}
                                className="h-9 w-64 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-[13px] text-gray-700 placeholder-gray-400 transition focus:w-80 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                            <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            aria-label="Notifikasi"
                        >
                            <Icon name="bell" className="h-[18px] w-[18px]" />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        </button>

                        <div className="h-6 w-px bg-gray-200" />

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen(o => !o)}
                                className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3 transition hover:bg-gray-100"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-bold text-white shadow-sm">
                                    {initials}
                                </span>
                                <div className="hidden text-left sm:block">
                                    <span className="block text-[13px] font-semibold text-gray-700 leading-tight">{user.name}</span>
                                    <span className="block text-[11px] text-gray-400 leading-tight">{user.role ?? 'Admin'}</span>
                                </div>
                                <Icon name="chevron-down" className="hidden h-4 w-4 text-gray-400 sm:block" />
                            </button>

                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                                    <div className="absolute right-0 z-20 mt-2 w-[200px] rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-[13px] font-semibold text-gray-700">{user.name}</p>
                                            <p className="text-[11px] text-gray-400">{user.role ?? 'Admin'}</p>
                                        </div>
                                        <Link
                                            href={safeRouteUrl('profile.edit')}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 transition hover:bg-gray-50"
                                        >
                                            <Icon name="users" className="h-4 w-4 text-gray-400" />
                                            Profil Saya
                                        </Link>
                                        <div className="my-1 h-px bg-gray-100" />
                                        <button
                                            onClick={() => {
                                                router.post(safeRouteUrl('logout'));
                                            }}
                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] text-gray-500 transition hover:bg-gray-50"
                                        >
                                            <Icon name="arrow-right" className="h-4 w-4 text-gray-400" />
                                            Keluar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Header Slot */}
                {header && (
                    <div className="border-b border-gray-200/80 bg-white px-4 sm:px-6 py-4">{header}</div>
                )}

                {/* Content */}
                <main className="px-4 sm:px-6 py-6 flex-1">{children}</main>
            </div>
        </div>
    );
}
