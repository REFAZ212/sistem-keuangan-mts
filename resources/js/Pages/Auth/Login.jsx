import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

/**
 * Halaman Login — Sistem Informasi Keuangan MTs
 *
 * Catatan implementasi:
 * - Halaman ini TIDAK dibungkus <GuestLayout> karena layout split-screen
 *   di sini berbeda dari layout auth bawaan Breeze (yang biasanya berupa
 *   kartu terpusat). Jika GuestLayout Anda sudah punya header/logo sendiri,
 *   sesuaikan agar tidak duplikat.
 * - Ganti `src` pada elemen <img> di panel kanan dengan foto gedung
 *   madrasah Anda (disarankan ukuran ≥ 1600×2000px, orientasi potret,
 *   format .jpg/.webp, diletakkan di /public/images/auth/). Selama file
 *   foto belum tersedia, ilustrasi garis (line-art) di bawahnya akan
 *   tetap tampil sebagai fallback visual yang rapi.
 * - Font: desain ini mengasumsikan "Inter" sebagai font-sans. Pastikan
 *   Inter dimuat (mis. via Google/Bunny Fonts di app.blade.php) dan
 *   didaftarkan sebagai font-sans di tailwind.config.js.
 * - Ganti logo kotak navy + inisial di kiri atas dengan logo resmi MTs
 *   (SVG/PNG) bila sudah tersedia.
 */

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk" />

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

                        <h1 className="text-[25px] font-semibold tracking-[-0.01em] text-[#172033]">
                            Sistem Informasi Keuangan MTs
                        </h1>
                        <p className="mt-2 text-[14px] leading-relaxed text-[#667085]">
                            Kelola keuangan madrasah dengan lebih mudah, transparan, dan terstruktur.
                        </p>

                        {status && (
                            <div className="mt-6 rounded-[10px] border border-[#12B76A]/25 bg-[#12B76A]/5 px-4 py-2.5 text-[13px] font-medium text-[#12B76A]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
                            {/* Email / Username */}
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
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
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

                            {/* Password */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label htmlFor="password" className="block text-[13px] font-medium text-[#172033]">
                                        Kata Sandi
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-[12.5px] font-medium text-[#1677FF] transition hover:text-[#0B1F3A]"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#98A2B3]">
                                        <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
                                            <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
                                            <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        placeholder="Masukkan kata sandi"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-[10px] border border-[#E4E7EC] bg-white py-2.5 pl-10 pr-10 text-[14px] text-[#172033] placeholder:text-[#98A2B3] shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition focus:border-[#1677FF] focus:ring-4 focus:ring-[#1677FF]/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#98A2B3] transition hover:text-[#667085]"
                                        aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                    >
                                        {showPassword ? (
                                            <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
                                                <path d="M2.5 10s2.7-5.3 7.5-5.3S17.5 10 17.5 10s-2.7 5.3-7.5 5.3S2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                                <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
                                                <path d="M3 3l14 14M8.3 8.4a2.2 2.2 0 0 0 3.1 3.1M6.2 6.3C4 7.5 2.5 10 2.5 10s2.7 5.3 7.5 5.3c1.4 0 2.6-.4 3.6-1M13.9 13.9c1.9-1.3 3.6-3.9 3.6-3.9s-2.7-5.3-7.5-5.3c-.6 0-1.2.06-1.8.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-[12.5px] text-[#F04438]">{errors.password}</p>
                                )}
                            </div>

                            {/* Ingat saya */}
                            <label className="flex cursor-pointer select-none items-center gap-2.5">
                                <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="peer absolute h-full w-full cursor-pointer appearance-none rounded-[5px] border border-[#D0D5DD] bg-white transition checked:border-[#1677FF] checked:bg-[#1677FF]"
                                    />
                                    <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none relative hidden h-[10px] w-[10px] text-white peer-checked:block">
                                        <path d="M2.5 7.2 5.4 10l6-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span className="text-[13.5px] text-[#667085]">Ingat saya di perangkat ini</span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-[10px] bg-[#1677FF] py-2.5 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#0B1F3A] focus:outline-none focus:ring-4 focus:ring-[#1677FF]/25 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Memproses…' : 'Masuk'}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-[12.5px] leading-relaxed text-[#667085]">
                            Mengalami kendala saat masuk?{' '}
                            <a href="mailto:admin@mtssubhanulyaum.sch.id" className="font-medium text-[#1677FF] hover:text-[#0B1F3A]">
                                Hubungi admin sistem
                            </a>
                        </p>
                    </div>

                    <p className="pt-8 text-center text-[11.5px] text-[#98A2B3]">
                        © {new Date().getFullYear()} MTs Subhanul Yaum. Seluruh hak dilindungi.
                    </p>
                </div>

                {/* ===== SISI KANAN — VISUAL ===== */}
                <div className="relative hidden overflow-hidden bg-[#0B1F3A] lg:block lg:w-[58%]">
                    {/* Ganti dengan foto gedung madrasah bila tersedia */}
                    <img
                        src="/images/auth/mtsbg.jpeg"
                        alt="Gedung MTs Subhanul Yaum"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Pola titik halus sebagai tekstur latar (fallback & aksen) */}
                    <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
                        <defs>
                            <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
                                <circle cx="1.4" cy="1.4" r="1.4" fill="#FFFFFF" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dotgrid)" />
                    </svg>

                    {/* Ilustrasi garis gedung madrasah — fallback bila foto belum ada */}
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

                    {/* Overlay gradasi navy — subtle */}
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