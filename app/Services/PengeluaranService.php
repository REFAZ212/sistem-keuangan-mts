<?php

namespace App\Services;

use App\Models\Pengeluaran;
use App\Repositories\PengeluaranRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class PengeluaranService
{
    public function __construct(protected PengeluaranRepository $repository) {}

    public function all(array $filters = []): LengthAwarePaginator
    {
        return $this->repository->all($filters);
    }

    public function find(int $id): ?Pengeluaran
    {
        return $this->repository->find($id);
    }

    public function create(array $data): Pengeluaran
    {
        $data['nomor_transaksi'] = $data['nomor_transaksi'] ?? Pengeluaran::generateNomorTransaksi();
        $data['status'] = $data['status'] ?? 'draft';
        $data['user_id'] = auth()->id();

        if ($data['jumlah'] < 0) {
            throw new \InvalidArgumentException('Jumlah pengeluaran tidak boleh negatif');
        }

        if (empty($data['account_id'])) {
            throw new \InvalidArgumentException('Akun pengeluaran wajib dipilih');
        }

        return $this->repository->create($data);
    }

    public function update(Pengeluaran $pengeluaran, array $data): Pengeluaran
    {
        if ($pengeluaran->status === 'disetujui') {
            throw new \InvalidArgumentException('Tidak dapat mengubah data yang sudah disetujui');
        }

        if (isset($data['jumlah']) && $data['jumlah'] < 0) {
            throw new \InvalidArgumentException('Jumlah pengeluaran tidak boleh negatif');
        }

        return $this->repository->update($pengeluaran, $data);
    }

    public function approve(Pengeluaran $pengeluaran): Pengeluaran
    {
        if (! $pengeluaran->account->canWithdraw($pengeluaran->jumlah)) {
            throw new \InvalidArgumentException('Saldo kas tidak mencukupi untuk pengeluaran ini');
        }

        return $this->repository->update($pengeluaran, ['status' => 'disetujui']);
    }

    public function delete(Pengeluaran $pengeluaran): bool
    {
        if ($pengeluaran->status === 'disetujui') {
            throw new \InvalidArgumentException('Tidak dapat menghapus data yang sudah disetujui');
        }

        return $this->repository->delete($pengeluaran);
    }

    public function getTotalDisetujui(?int $accountId = null, ?string $dateFrom = null, ?string $dateTo = null): float
    {
        return $this->repository->getTotalDisetujui($accountId, $dateFrom, $dateTo);
    }
}
