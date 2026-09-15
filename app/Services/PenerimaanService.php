<?php

namespace App\Services;

use App\Models\Penerimaan;
use App\Repositories\PenerimaanRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class PenerimaanService
{
    public function __construct(protected PenerimaanRepository $repository) {}

    public function all(array $filters = []): LengthAwarePaginator
    {
        return $this->repository->all($filters);
    }

    public function find(int $id): ?Penerimaan
    {
        return $this->repository->find($id);
    }

    public function create(array $data): Penerimaan
    {
        $data['nomor_transaksi'] = $data['nomor_transaksi'] ?? Penerimaan::generateNomorTransaksi();
        $data['status'] = $data['status'] ?? 'draft';
        $data['user_id'] = auth()->id();

        if ($data['jumlah'] < 0) {
            throw new \InvalidArgumentException('Jumlah penerimaan tidak boleh negatif');
        }

        return $this->repository->create($data);
    }

    public function update(Penerimaan $penerimaan, array $data): Penerimaan
    {
        if ($penerimaan->status === 'disetujui') {
            throw new \InvalidArgumentException('Tidak dapat mengubah data yang sudah disetujui');
        }

        if (isset($data['jumlah']) && $data['jumlah'] < 0) {
            throw new \InvalidArgumentException('Jumlah penerimaan tidak boleh negatif');
        }

        return $this->repository->update($penerimaan, $data);
    }

    public function approve(Penerimaan $penerimaan): Penerimaan
    {
        return $this->repository->update($penerimaan, ['status' => 'disetujui']);
    }

    public function delete(Penerimaan $penerimaan): bool
    {
        if ($penerimaan->status === 'disetujui') {
            throw new \InvalidArgumentException('Tidak dapat menghapus data yang sudah disetujui');
        }

        return $this->repository->delete($penerimaan);
    }

    public function getTotalDisetujui(?int $accountId = null, ?string $dateFrom = null, ?string $dateTo = null): float
    {
        return $this->repository->getTotalDisetujui($accountId, $dateFrom, $dateTo);
    }
}
