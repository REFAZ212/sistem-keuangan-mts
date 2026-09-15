<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('penerimaan', function (Blueprint $table) {
            $table->foreignId('kategori_id')->nullable()->after('account_id')->constrained('kategori_keuangan')->onDelete('set null');
        });

        Schema::table('pengeluaran', function (Blueprint $table) {
            $table->foreignId('kategori_id')->nullable()->after('account_id')->constrained('kategori_keuangan')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('penerimaan', function (Blueprint $table) {
            $table->dropForeign(['kategori_id']);
            $table->dropColumn('kategori_id');
        });

        Schema::table('pengeluaran', function (Blueprint $table) {
            $table->dropForeign(['kategori_id']);
            $table->dropColumn('kategori_id');
        });
    }
};
