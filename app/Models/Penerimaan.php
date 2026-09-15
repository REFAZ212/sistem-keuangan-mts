<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Penerimaan extends Model
{
    protected $table = 'penerimaan';

    protected $fillable = [
        'nomor_transaksi',
        'tanggal',
        'account_id',
        'kategori_id',
        'jumlah',
        'keterangan',
        'user_id',
        'status',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jumlah' => 'decimal:2',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriKeuangan::class, 'kategori_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function generateNomorTransaksi(): string
    {
        $prefix = 'TRM';
        $date = now()->format('Ymd');
        $last = self::whereDate('created_at', today())
            ->where('nomor_transaksi', 'like', "{$prefix}{$date}%")
            ->latest('nomor_transaksi')
            ->first();

        $sequence = $last ? (int) substr($last->nomor_transaksi, -4) + 1 : 1;

        return sprintf('%s%s%04d', $prefix, $date, $sequence);
    }
}
