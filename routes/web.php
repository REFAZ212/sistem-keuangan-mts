<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\KategoriKeuanganController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('penerimaan', PenerimaanController::class)
        ->except(['show'])
        ->names('penerimaan');
    Route::post('penerimaan/{penerimaan}/approve', [PenerimaanController::class, 'approve'])->name('penerimaan.approve');
    Route::get('penerimaan/{penerimaan}', [PenerimaanController::class, 'show'])->name('penerimaan.show');

    Route::resource('pengeluaran', PengeluaranController::class)
        ->except(['show'])
        ->names('pengeluaran');
    Route::post('pengeluaran/{pengeluaran}/approve', [PengeluaranController::class, 'approve'])->name('pengeluaran.approve');
    Route::get('pengeluaran/{pengeluaran}', [PengeluaranController::class, 'show'])->name('pengeluaran.show');

    Route::get('kas', [KasController::class, 'index'])->name('kas.index');

    Route::prefix('laporan')->name('laporan.')->group(function () {
        Route::get('/', [LaporanController::class, 'index'])->name('index');
        Route::get('kas', [LaporanController::class, 'kas'])->name('kas');
        Route::get('penerimaan', [LaporanController::class, 'penerimaan'])->name('penerimaan');
        Route::get('pengeluaran', [LaporanController::class, 'pengeluaran'])->name('pengeluaran');
    });

    // Export routes
    Route::prefix('export')->name('export.')->group(function () {
        Route::get('kas/pdf', [ExportController::class, 'kasPdf'])->name('kas.pdf');
        Route::get('kas/excel', [ExportController::class, 'kasExcel'])->name('kas.excel');
        Route::get('penerimaan/pdf', [ExportController::class, 'penerimaanPdf'])->name('penerimaan.pdf');
        Route::get('penerimaan/excel', [ExportController::class, 'penerimaanExcel'])->name('penerimaan.excel');
        Route::get('pengeluaran/pdf', [ExportController::class, 'pengeluaranPdf'])->name('pengeluaran.pdf');
        Route::get('pengeluaran/excel', [ExportController::class, 'pengeluaranExcel'])->name('pengeluaran.excel');
        Route::get('kuitansi/penerimaan/{id}', [ExportController::class, 'kuitansiPenerimaan'])->name('kuitansi.penerimaan');
        Route::get('kuitansi/pengeluaran/{id}', [ExportController::class, 'kuitansiPengeluaran'])->name('kuitansi.pengeluaran');
    });

    // Admin routes (role-based)
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class)->names('users');
        Route::resource('kategori', KategoriKeuanganController::class)->names('kategori');
        Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
    });

    // Kategori accessible by bendahara too (read-only)
    Route::middleware('role:bendahara,admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('kategori', [KategoriKeuanganController::class, 'index'])->name('kategori.index');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
