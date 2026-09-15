<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penerimaan', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_transaksi')->unique();
            $table->date('tanggal');
            $table->foreignId('account_id')->constrained('accounts')->onDelete('restrict');
            $table->decimal('jumlah', 15, 2)->unsigned();
            $table->text('keterangan')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('restrict');
            $table->enum('status', ['draft', 'disetujui'])->default('draft');
            $table->timestamps();

            $table->index(['tanggal', 'status']);
            $table->index('account_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penerimaan');
    }
};
