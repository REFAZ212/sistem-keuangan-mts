<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kategori_keuangan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('tipe', ['pemasukan', 'pengeluaran']);
            $table->text('deskripsi')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('tipe');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kategori_keuangan');
    }
};
