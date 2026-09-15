<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriKeuangan extends Model
{
    protected $table = 'kategori_keuangan';

    protected $fillable = ['nama', 'tipe', 'deskripsi', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    public function penerimaan(): HasMany
    {
        return $this->hasMany(Penerimaan::class);
    }

    public function pengeluaran(): HasMany
    {
        return $this->hasMany(Pengeluaran::class);
    }
}
