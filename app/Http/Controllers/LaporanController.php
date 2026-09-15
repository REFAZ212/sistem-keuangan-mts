<?php

namespace App\Http\Controllers;

use App\Services\AccountService;
use App\Services\LaporanService;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function __construct(
        protected LaporanService $laporanService,
        protected AccountService $accountService
    ) {}

    public function index()
    {
        $filters = request()->only(['date_from', 'date_to']);
        $accounts = $this->accountService->getKasAccounts();

        return Inertia::render('Laporan/Index', [
            'accounts' => $accounts,
            'filters' => $filters,
        ]);
    }

    public function kas()
    {
        $filters = request()->only(['date_from', 'date_to']);
        $laporan = $this->laporanService->getLaporanKas(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null
        );

        return Inertia::render('Laporan/Kas', [
            'laporan' => $laporan,
            'filters' => $filters,
        ]);
    }

    public function penerimaan()
    {
        $filters = request()->only(['date_from', 'date_to', 'account_id']);
        $accounts = $this->accountService->getKasAccounts();
        $laporan = $this->laporanService->getLaporanPenerimaan(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null,
            $filters['account_id'] ?? null
        );

        return Inertia::render('Laporan/Penerimaan', [
            'laporan' => $laporan,
            'accounts' => $accounts,
            'filters' => $filters,
        ]);
    }

    public function pengeluaran()
    {
        $filters = request()->only(['date_from', 'date_to', 'account_id']);
        $accounts = $this->accountService->getKasAccounts();
        $laporan = $this->laporanService->getLaporanPengeluaran(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null,
            $filters['account_id'] ?? null
        );

        return Inertia::render('Laporan/Pengeluaran', [
            'laporan' => $laporan,
            'accounts' => $accounts,
            'filters' => $filters,
        ]);
    }
}
