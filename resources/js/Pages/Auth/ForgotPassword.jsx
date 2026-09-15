import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Halaman Lupa Password — Sistem Informasi Keuangan MTs Subhanul Yaum
 * Mengikuti 100% design language halaman Login (split-screen, token warna,
 * radius, shadow, typography, dan ilustrasi panel kanan yang sama).
 */

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Lupa Password" />

            <div className="flex min-h-screen w-full bg-white font-sans">
                {/* ===== SISI KIRI — FORM ===== */}
                <div className="flex w-full flex-col justify-between px-8 py-10 sm:px-14 lg:w-[42%] xl:px-20">
                    <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center">
                        {/* Logo & nama sistem */}
                        <div className="mb-10 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#0B1F3A] shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                                    <path d="M12 3.5 3 8l9 4.5 9-4.5-9-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                    <path d="M6.5 10.3V15c0 1.4 2.46 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 9v5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="leading-tight">
                                <p className="text-[14.5px] font-semibold text-[#172033]">MTs Subhanul Yaum</p>
                                <p className="text-[12px] text-[#667085]">Sistem Informasi Keuangan</p>
                            </div>
                        </div>

                        {/* Ikon amplop kecil sebagai penanda konteks halaman */}
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#1677FF]/10">
                            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-[#1677FF]">
                                <path d="M3.3 5.8c0-.83.67-1.5 1.5-1.5h10.4c.83 0 1.5.67 1.5 1.5v8.4c0 .83-.67 1.5-1.5 1.5H4.8c-.83 0-1.5-.67-1.5-1.5V5.8Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M4 5.9l6 4.6 6-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h1 className="text-[25px] font-semibold tracking-[-0.01em] text-[#172033]">
                            Lupa Kata Sandi?
                        </h1>
                        <p className="mt-2 text-[14px] leading-relaxed text-[#667085]">
                            Masukkan email atau username akun Anda. Kami akan mengirimkan tautan untuk membuat kata sandi baru.
                        </p>

                        {status && (
                            <div className="mt-6 rounded-[10px] border border-[#12B76A]/25 bg-[#12B76A]/5 px-4 py-2.5 text-[13px] font-medium text-[#12B76A]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-[#172033]">
                                    Email atau Username
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#98A2B3]">
                                        <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
                                            <path d="M3.3 5.8c0-.83.67-1.5 1.5-1.5h10.4c.83 0 1.5.67 1.5 1.5v8.4c0 .83-.67 1.5-1.5 1.5H4.8c-.83 0-1.5-.67-1.5-1.5V5.8Z" stroke="currentColor" strokeWidth="1.4" />
                                            <path d="M4 5.9l6 4.6 6-4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoFocus
                                        placeholder="nama@mtssubhanulyaum.sch.id"
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-[10px] border border-[#E4E7EC] bg-white py-2.5 pl-10 pr-3.5 text-[14px] text-[#172033] placeholder:text-[#98A2B3] shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition focus:border-[#1677FF] focus:ring-4 focus:ring-[#1677FF]/10"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-[12.5px] text-[#F04438]">{errors.email}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-[10px] bg-[#1677FF] py-2.5 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#0B1F3A] focus:outline-none focus:ring-4 focus:ring-[#1677FF]/25 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Mengirim…' : 'Kirim Tautan Reset'}
                            </button>
                        </form>

                        <Link
                            href={route('login')}
                            className="mt-6 flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#667085] transition hover:text-[#1677FF]"
                        >
                            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                <path d="M12.5 15.5 7 10l5.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Kembali ke halaman masuk
                        </Link>

                        <p className="mt-7 text-center text-[12.5px] leading-relaxed text-[#667085]">
                            Mengalami kendala?{' '}
                            <a href="mailto:admin@mtssubhanulyaum.sch.id" className="font-medium text-[#1677FF] hover:text-[#0B1F3A]">
                                Hubungi admin sistem
                            </a>
                        </p>
                    </div>

                    <p className="pt-8 text-center text-[11.5px] text-[#98A2B3]">
                        © {new Date().getFullYear()} MTs Subhanul Yaum. Seluruh hak dilindungi.
                    </p>
                </div>

                {/* ===== SISI KANAN — VISUAL (identik dengan halaman Login) ===== */}
                <div className="relative hidden overflow-hidden bg-[#0B1F3A] lg:block lg:w-[58%]">
                    <img
                        src="/images/auth/mtsbg.jpeg"
                        alt="Gedung MTs Subhanul Yaum"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
                        <defs>
                            <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
                                <circle cx="1.4" cy="1.4" r="1.4" fill="#FFFFFF" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dotgrid)" />
                    </svg>

                    <svg
                        viewBox="0 0 600 400"
                        className="absolute inset-x-0 bottom-[26%] mx-auto h-auto w-[62%] max-w-[420px] text-white/[0.14]"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path d="M60 320V160l240-90 240 90v160" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                        <path d="M60 320h480" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M180 320V200h60v120M360 320V200h60v120" stroke="currentColor" strokeWidth="2" />
                        <circle cx="300" cy="150" r="34" stroke="currentColor" strokeWidth="2.5" />
                        <path d="M300 116V90M282 100l36 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M270 320v-70a30 30 0 0 1 60 0v70" stroke="currentColor" strokeWidth="2.5" />
                    </svg>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-[#0B1F3A]/40 to-[#0B1F3A]/10" />

                    <div className="relative flex h-full flex-col justify-end p-16">
                        <h2 className="max-w-md text-[32px] font-semibold leading-[1.25] text-white">
                            Pendidikan Berkualitas untuk Generasi Terbaik
                        </h2>
                        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/70">
                            Satu sistem terpadu untuk mengelola pemasukan, pengeluaran, dan tagihan madrasah secara akuntabel.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}