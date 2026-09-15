# DESIGN.md

# Sistem Informasi Keuangan MTs

## Purpose

Dokumen ini menjadi sumber utama untuk seluruh keputusan desain UI/UX.

Tujuan utama:

- Menjaga konsistensi visual
- Menjaga konsistensi UX
- Menghindari desain yang berbeda-beda antar halaman
- Menjadi acuan seluruh pengembangan frontend
- Memastikan aplikasi mudah digunakan oleh staf madrasah

Semua perubahan UI harus mengikuti dokumen ini.

---

# Design Principles

Prioritas desain:

1. Usability
2. Consistency
3. Readability
4. Accessibility
5. Performance
6. Maintainability

Jika terdapat konflik:

Usability > Visual Preference

Jangan mengorbankan kemudahan penggunaan hanya demi estetika.

---

# Product Personality

Aplikasi harus terasa:

- Profesional
- Modern
- Bersih
- Terpercaya
- Terstruktur
- Stabil
- Enterprise

Aplikasi tidak boleh terasa seperti:

- Landing page
- Marketplace
- E-commerce
- Fintech consumer
- Social media
- Gaming dashboard

---

# Design Language

Gunakan gaya:

- Clean
- Minimal
- Professional
- Modern Enterprise

Hindari:

- Neon colors
- Glassmorphism berlebihan
- Gradient berlebihan
- Heavy shadow
- Visual noise
- Decorative UI

---

# Color System

## Primary

Navy

```css
#0B1F3A
```

Digunakan untuk:

- Sidebar
- Branding
- Navigation

---

Dark Navy

```css
#071A33
```

Digunakan untuk:

- Hover state sidebar
- Dark section

---

Blue

```css
#1677FF
```

Digunakan untuk:

- Primary action
- Link
- Focus state

---

## Semantic Colors

Success

```css
#12B76A
```

Warning

```css
#F79009
```

Danger

```css
#F04438
```

---

## Neutral Colors

Background

```css
#F5F7FA
```

Surface

```css
#FFFFFF
```

Border

```css
#E4E7EC
```

Text Primary

```css
#172033
```

Text Secondary

```css
#667085
```

---

# Typography

Primary font:

Inter

Fallback:

sans-serif

---

## Font Sizes

### Page Title

32px

### Section Title

20px

### Card Title

18px

### Body

14px–16px

### Caption

12px–13px

---

# Spacing System

Gunakan kelipatan:

```text
4
8
12
16
20
24
32
40
48
64
```

Jangan membuat spacing acak.

---

# Border Radius

Small

```css
8px
```

Medium

```css
12px
```

Large

```css
14px
```

Gunakan secara konsisten.

---

# Shadow System

Gunakan shadow ringan.

Contoh:

```css
0 1px 2px rgba(0,0,0,.05)
```

atau

```css
0 4px 12px rgba(0,0,0,.06)
```

Hindari shadow berat.

---

# Layout System

## Login Layout

Split screen:

40% form

60% visual

---

## Internal Layout

Gunakan:

Sidebar
+
Topbar
+
Content Area

Jangan membuat layout baru untuk setiap halaman.

---

# Sidebar

Width:

250px–270px

Background:

Primary Navy

Harus memuat:

- Logo
- Nama aplikasi
- Navigation
- Active state

Sidebar wajib reusable.

---

# Topbar

Memuat:

- Breadcrumb
- Notification
- User Menu

Topbar harus sama pada seluruh halaman internal.

---

# Navigation Structure

Dashboard

Keuangan

- Pemasukan
- Pengeluaran
- Kas
- Anggaran

Laporan

- Laporan Keuangan
- Rekap Bulanan

Master Data

- Kategori
- Akun Keuangan

Manajemen

- Pengguna
- Role & Permission

Lainnya

- Profil
- Pengaturan

---

# Page Structure

Gunakan pola:

Page Header

↓

Action Bar

↓

Filters

↓

Content

↓

Pagination

Jangan membuat struktur berbeda tanpa alasan.

---

# Page Header

Berisi:

- Judul halaman
- Deskripsi singkat
- Action utama

Contoh:

Pemasukan

Kelola seluruh transaksi pemasukan madrasah

[ Tambah Pemasukan ]

---

# Cards

Card harus memiliki:

- Background putih
- Border tipis
- Radius 12px
- Padding konsisten

Card tidak boleh memiliki warna mencolok kecuali memang diperlukan.

---

# Dashboard

Dashboard harus memuat:

## Summary Cards

- Total Pemasukan
- Total Pengeluaran
- Saldo Kas
- Total Transaksi

---

## Cash Flow Chart

Menampilkan:

- Pemasukan
- Pengeluaran
- Saldo

---

## Recent Transactions

Tabel transaksi terbaru.

---

## Quick Actions

- Tambah Pemasukan
- Tambah Pengeluaran
- Lihat Laporan

---

# Tables

Semua tabel harus menggunakan pola yang sama.

Kolom uang:

Rata kanan.

Status:

Badge.

Action:

Dropdown atau action menu.

Wajib memiliki:

- Loading State
- Empty State
- Error State

---

# Forms

Seluruh form harus menggunakan komponen yang sama.

Struktur:

Label

↓

Input

↓

Helper Text

↓

Validation Message

---

# Buttons

## Primary

Blue

## Secondary

Outline

## Danger

Red

Jangan membuat variasi baru tanpa alasan.

---

# Modals

Digunakan untuk:

- Delete
- Confirmation
- Approval

Jangan melakukan destructive action tanpa konfirmasi.

---

# Badges

Success

Green

Warning

Orange

Danger

Red

Info

Blue

Gunakan secara konsisten.

---

# Responsive Rules

## Desktop

Sidebar tampil.

## Tablet

Sidebar collapse.

## Mobile

Sidebar menjadi drawer.

---

# Accessibility

Wajib memperhatikan:

- Keyboard navigation
- Focus state
- Semantic HTML
- Label form
- Color contrast

---

# Empty State

Setiap halaman data wajib memiliki empty state.

Contoh:

Belum ada data pemasukan.

[ Tambah Pemasukan ]

---

# Loading State

Gunakan skeleton loading.

Jangan menampilkan layar kosong saat data sedang dimuat.

---

# Error State

Harus memberikan:

- Informasi error
- Tombol retry

---

# Reusable Components

Prioritaskan:

- Button
- Input
- Select
- Textarea
- Modal
- Badge
- Card
- Table
- Pagination
- Breadcrumb
- PageHeader
- StatCard
- EmptyState
- LoadingState
- ErrorState

Jangan membuat komponen yang sama berkali-kali.

---

# Consistency Rules

Ini adalah aturan terpenting.

Jika sebuah pola sudah digunakan:

- gunakan kembali
- jangan membuat versi baru

Jika tombol "Tambah" sudah memiliki style tertentu:

Gunakan style yang sama pada seluruh aplikasi.

Jika tabel sudah memiliki style tertentu:

Gunakan style yang sama pada seluruh aplikasi.

Semua halaman harus terasa berasal dari satu produk yang sama.

---

# Definition of Done

UI dianggap selesai jika:

- Mengikuti design system
- Responsive
- Accessible
- Reusable
- Konsisten dengan halaman lain
- Tidak menghasilkan warning visual
- Tidak menimbulkan inkonsistensi UX

Dokumen ini adalah sumber utama untuk seluruh keputusan desain.