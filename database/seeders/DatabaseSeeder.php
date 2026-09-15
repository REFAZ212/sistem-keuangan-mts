<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\KategoriKeuangan;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'manage-users',
            'manage-settings',
            'manage-kategori',
            'create-penerimaan',
            'edit-penerimaan',
            'delete-penerimaan',
            'approve-penerimaan',
            'create-pengeluaran',
            'edit-pengeluaran',
            'delete-pengeluaran',
            'approve-pengeluaran',
            'view-kas',
            'view-laporan',
            'export-laporan',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // Create roles with permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web'], ['label' => 'Administrator']);
        $adminRole->syncPermissions($permissions); // Admin gets all

        $bendaharaRole = Role::firstOrCreate(['name' => 'bendahara', 'guard_name' => 'web'], ['label' => 'Bendahara']);
        $bendaharaRole->syncPermissions([
            'create-penerimaan', 'edit-penerimaan', 'delete-penerimaan',
            'create-pengeluaran', 'edit-pengeluaran', 'delete-pengeluaran',
            'view-kas', 'view-laporan', 'export-laporan', 'manage-kategori',
        ]);

        $pengawasRole = Role::firstOrCreate(['name' => 'pengawas', 'guard_name' => 'web'], ['label' => 'Pengawas']);
        $pengawasRole->syncPermissions([
            'approve-penerimaan', 'approve-pengeluaran',
            'view-kas', 'view-laporan', 'export-laporan',
        ]);

        // Create accounts
        $kasKecil = Account::firstOrCreate(
            ['kode' => 'KAS-001'],
            [
                'nama' => 'Kas Kecil',
                'tipe' => 'kas',
                'saldo_awal' => 5000000,
                'is_active' => true,
            ]
        );

        $kasUmum = Account::firstOrCreate(
            ['kode' => 'KAS-002'],
            [
                'nama' => 'Kas Umum',
                'tipe' => 'kas',
                'saldo_awal' => 10000000,
                'is_active' => true,
            ]
        );

        $bankBri = Account::firstOrCreate(
            ['kode' => 'BANK-001'],
            [
                'nama' => 'BRI - Rekening Utama',
                'tipe' => 'bank',
                'saldo_awal' => 25000000,
                'is_active' => true,
            ]
        );

        // Create kategori keuangan
        $kategoriPemasukan = [
            ['nama' => 'SPP Bulanan', 'tipe' => 'pemasukan', 'deskripsi' => 'Pembayaran SPP siswa per bulan'],
            ['nama' => 'Dana BOS', 'tipe' => 'pemasukan', 'deskripsi' => 'Bantuan Operasional Sekolah dari pemerintah'],
            ['nama' => 'Infaq', 'tipe' => 'pemasukan', 'deskripsi' => 'Donasi/infaq dari siswa dan orang tua'],
            ['nama' => 'Uang Praktikum', 'tipe' => 'pemasukan', 'deskripsi' => 'Biaya praktikum siswa'],
            ['nama' => 'Penerimaan Lainnya', 'tipe' => 'pemasukan', 'deskripsi' => 'Pemasukan dari sumber lain'],
        ];

        $kategoriPengeluaran = [
            ['nama' => 'Gaji Guru', 'tipe' => 'pengeluaran', 'deskripsi' => 'Pembayaran gaji guru dan staf'],
            ['nama' => 'Operasional Sekolah', 'tipe' => 'pengeluaran', 'deskripsi' => 'Biaya operasional harian sekolah'],
            ['nama' => 'Listrik & Air', 'tipe' => 'pengeluaran', 'deskripsi' => 'Pembayaran listrik dan air'],
            ['nama' => 'Perlengkapan Kantor', 'tipe' => 'pengeluaran', 'deskripsi' => 'Pembelian ATK dan perlengkapan kantor'],
            ['nama' => 'Pengeluaran Lainnya', 'tipe' => 'pengeluaran', 'deskripsi' => 'Biaya lain-lain'],
        ];

        foreach (array_merge($kategoriPemasukan, $kategoriPengeluaran) as $k) {
            KategoriKeuangan::firstOrCreate(
                ['nama' => $k['nama']],
                ['tipe' => $k['tipe'], 'deskripsi' => $k['deskripsi'], 'is_active' => true]
            );
        }

        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $admin->syncRoles(['admin']);

        // Create bendahara user
        $bendahara = User::firstOrCreate(
            ['email' => 'bendahara@example.com'],
            [
                'name' => 'Bendahara',
                'password' => bcrypt('password'),
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $bendahara->syncRoles(['bendahara']);

        // Create pengawas user
        $pengawas = User::firstOrCreate(
            ['email' => 'pengawas@example.com'],
            [
                'name' => 'Pengawas',
                'password' => bcrypt('password'),
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $pengawas->syncRoles(['pengawas']);

        // Default settings
        $settings = [
            'nama_sekolah' => 'MTs Subhanul Yaum',
            'alamat' => 'Jl. Contoh No. 123, Kota',
            'telepon' => '021-1234567',
            'email_sekolah' => 'info@subhanulyaum.sch.id',
            'website' => 'https://subhanulyaum.sch.id',
            'kepala_sekolah' => '',
            'nip_kepala_sekolah' => '',
            'bendahara_nama' => '',
            'bendahara_nip' => '',
        ];

        foreach ($settings as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value, 'group' => 'general']);
        }
    }
}
