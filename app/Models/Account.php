<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    protected $fillable = [
        'kode',
        'nama',
        'tipe',
        'saldo_awal',
        'is_active',
    ];

    protected $casts = [
        'saldo_awal' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function penerimaan(): HasMany
    {
        return $this->hasMany(Penerimaan::class);
    }

    public function pengeluaran(): HasMany
    {
        return $this->hasMany(Pengeluaran::class);
    }

    public function getSaldoAttribute(): float
    {
        $totalPenerimaan = $this->penerimaan()
            ->where('status', 'disetujui')
            ->sum('jumlah');

        $totalPengeluaran = $this->pengeluaran()
            ->where('status', 'disetujui')
            ->sum('jumlah');

        return $this->saldo_awal + $totalPenerimaan - $totalPengeluaran;
    }

    public function canWithdraw(float $amount): bool
    {
        return $this->saldo >= $amount;
    }
}
