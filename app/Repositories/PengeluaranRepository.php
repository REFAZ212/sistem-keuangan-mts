<?php

namespace App\Repositories;

use App\Models\Pengeluaran;
use Illuminate\Pagination\LengthAwarePaginator;

class PengeluaranRepository
{
    public function all(array $filters = []): LengthAwarePaginator
    {
        $query = Pengeluaran::with(['account', 'user'])
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

    public function find(int $id): ?Pengeluaran
    {
        return Pengeluaran::with(['account', 'user'])->find($id);
    }

    public function create(array $data): Pengeluaran
    {
        return Pengeluaran::create($data);
    }

    public function update(Pengeluaran $pengeluaran, array $data): Pengeluaran
    {
        $pengeluaran->update($data);

        return $pengeluaran->fresh();
    }

    public function delete(Pengeluaran $pengeluaran): bool
    {
        return $pengeluaran->delete();
    }

    public function getTotalDisetujui(?int $accountId = null, ?string $dateFrom = null, ?string $dateTo = null): float
    {
        $query = Pengeluaran::where('status', 'disetujui');

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
