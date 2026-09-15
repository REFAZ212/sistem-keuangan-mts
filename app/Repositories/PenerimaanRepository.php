<?php

namespace App\Repositories;

use App\Models\Penerimaan;
use Illuminate\Pagination\LengthAwarePaginator;

class PenerimaanRepository
{
    public function all(array $filters = []): LengthAwarePaginator
    {
        $query = Penerimaan::with(['account', 'user'])
            ->latest('tanggal');

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['account_id'])) {
            $query->where('account_id', $filters['account_id']);
        }

        if (! empty($filters['date_from'])) {
            $query->where('tanggal', '>=', $filters['date_from']);
        }

        if (! empty($filters['date_to'])) {
            $query->where('tanggal', '<=', $filters['date_to']);
        }

        return $query->paginate(15);
    }

    public function find(int $id): ?Penerimaan
    {
        return Penerimaan::with(['account', 'user'])->find($id);
    }

    public function create(array $data): Penerimaan
    {
        return Penerimaan::create($data);
    }

    public function update(Penerimaan $penerimaan, array $data): Penerimaan
    {
        $penerimaan->update($data);

        return $penerimaan->fresh();
    }

    public function delete(Penerimaan $penerimaan): bool
    {
        return $penerimaan->delete();
    }

    public function getTotalDisetujui(?int $accountId = null, ?string $dateFrom = null, ?string $dateTo = null): float
    {
        $query = Penerimaan::where('status', 'disetujui');

        if ($accountId) {
            $query->where('account_id', $accountId);
        }

        if ($dateFrom) {
            $query->where('tanggal', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->where('tanggal', '<=', $dateTo);
        }

        return (float) $query->sum('jumlah');
    }
}
