<?php

namespace App\Services;

use App\Models\Penerimaan;
use App\Models\Pengeluaran;
use App\Repositories\AccountRepository;
use App\Repositories\PenerimaanRepository;
use App\Repositories\PengeluaranRepository;

class LaporanService
{
    public function __construct(
        protected AccountRepository $accountRepository,
        protected PenerimaanRepository $penerimaanRepository,
        protected PengeluaranRepository $pengeluaranRepository
    ) {}

    public function getLaporanKas(?string $dateFrom = null, ?string $dateTo = null): array
    {
        $accounts = $this->accountRepository->getKasAccounts();

        $result = [];
        $grandTotal = [
            'saldo_awal' => 0,
            'total_penerimaan' => 0,
            'total_pengeluaran' => 0,
            'saldo_akhir' => 0,
        ];

        foreach ($accounts as $account) {
            $penerimaan = $this->penerimaanRepository->getTotalDisetujui($account->id, $dateFrom, $dateTo);
            $pengeluaran = $this->pengeluaranRepository->getTotalDisetujui($account->id, $dateFrom, $dateTo);
            $saldoAwal = $account->saldo_awal;
            $saldoAkhir = $saldoAwal + $penerimaan - $pengeluaran;

            $result[] = [
                'account' => $account,
                'saldo_awal' => $saldoAwal,
                'total_penerimaan' => $penerimaan,
                'total_pengeluaran' => $pengeluaran,
                'saldo_akhir' => $saldoAkhir,
            ];

            $grandTotal['saldo_awal'] += $saldoAwal;
            $grandTotal['total_penerimaan'] += $penerimaan;
            $grandTotal['total_pengeluaran'] += $pengeluaran;
            $grandTotal['saldo_akhir'] += $saldoAkhir;
        }

        return [
            'accounts' => $result,
            'grand_total' => $grandTotal,
            'periode' => [
                'dari' => $dateFrom,
                'sampai' => $dateTo,
            ],
        ];
    }

    public function getLaporanPenerimaan(?string $dateFrom = null, ?string $dateTo = null, ?int $accountId = null): array
    {
        $query = Penerimaan::with(['account', 'user'])
            ->where('status', 'disetujui')
            ->orderBy('tanggal');

        if ($dateFrom) {
            $query->where('tanggal', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->where('tanggal', '<=', $dateTo);
        }

        if ($accountId) {
            $query->where('account_id', $accountId);
        }

        $penerimaan = $query->get();
        $total = $penerimaan->sum('jumlah');

        return [
            'penerimaan' => $penerimaan,
            'total' => $total,
            'periode' => [
                'dari' => $dateFrom,
                'sampai' => $dateTo,
            ],
        ];
    }

    public function getLaporanPengeluaran(?string $dateFrom = null, ?string $dateTo = null, ?int $accountId = null): array
    {
        $query = Pengeluaran::with(['account', 'user'])
            ->where('status', 'disetujui')
            ->orderBy('tanggal');

        if ($dateFrom) {
            $query->where('tanggal', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->where('tanggal', '<=', $dateTo);
        }

        if ($accountId) {
            $query->where('account_id', $accountId);
        }

        $pengeluaran = $query->get();
        $total = $pengeluaran->sum('jumlah');

        return [
            'pengeluaran' => $pengeluaran,
            'total' => $total,
            'periode' => [
                'dari' => $dateFrom,
                'sampai' => $dateTo,
            ],
        ];
    }
}
