<?php

namespace App\Services;

use App\Repositories\AccountRepository;
use App\Repositories\PenerimaanRepository;
use App\Repositories\PengeluaranRepository;

class KasService
{
    public function __construct(
        protected AccountRepository $accountRepository,
        protected PenerimaanRepository $penerimaanRepository,
        protected PengeluaranRepository $pengeluaranRepository
    ) {}

    public function getSaldoKas(?string $dateFrom = null, ?string $dateTo = null): array
    {
        $accounts = $this->accountRepository->getKasAccounts();

        $result = [];
        $totalSaldo = 0;
        $totalPenerimaan = 0;
        $totalPengeluaran = 0;

        foreach ($accounts as $account) {
            $penerimaan = $this->penerimaanRepository->getTotalDisetujui($account->id, $dateFrom, $dateTo);
            $pengeluaran = $this->pengeluaranRepository->getTotalDisetujui($account->id, $dateFrom, $dateTo);
            $saldo = $account->saldo_awal + $penerimaan - $pengeluaran;

            $result[] = [
                'account' => $account,
                'saldo_awal' => $account->saldo_awal,
                'total_penerimaan' => $penerimaan,
                'total_pengeluaran' => $pengeluaran,
                'saldo_akhir' => $saldo,
            ];

            $totalSaldo += $saldo;
            $totalPenerimaan += $penerimaan;
            $totalPengeluaran += $pengeluaran;
        }

        return [
            'accounts' => $result,
            'total' => [
                'saldo_awal' => $accounts->sum('saldo_awal'),
                'total_penerimaan' => $totalPenerimaan,
                'total_pengeluaran' => $totalPengeluaran,
                'saldo_akhir' => $totalSaldo,
            ],
        ];
    }

    public function getSummary(): array
    {
        return $this->getSaldoKas();
    }
}
