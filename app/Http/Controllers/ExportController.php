<?php

namespace App\Http\Controllers;

use App\Services\LaporanService;
use App\Models\Setting;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\LaporanKasExport;
use App\Exports\LaporanPenerimaanExport;
use App\Exports\LaporanPengeluaranExport;

class ExportController extends Controller
{
    public function __construct(protected LaporanService $laporanService) {}

    public function kasPdf(Request $request)
    {
        $filters = $request->only(['date_from', 'date_to']);
        $laporan = $this->laporanService->getLaporanKas(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null
        );

        $settings = Setting::getGroup('general');

        $pdf = Pdf::loadView('exports.kas-pdf', [
            'laporan' => $laporan,
            'filters' => $filters,
            'settings' => $settings,
        ])->setPaper('a4', 'portrait');

        return $pdf->download('laporan-kas.pdf');
    }

    public function kasExcel(Request $request)
    {
        $filters = $request->only(['date_from', 'date_to']);

        return Excel::download(
            new LaporanKasExport($filters['date_from'] ?? null, $filters['date_to'] ?? null),
            'laporan-kas.xlsx'
        );
    }

    public function penerimaanPdf(Request $request)
    {
        $filters = $request->only(['date_from', 'date_to', 'account_id']);
        $laporan = $this->laporanService->getLaporanPenerimaan(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null,
            $filters['account_id'] ?? null
        );

        $settings = Setting::getGroup('general');

        $pdf = Pdf::loadView('exports.penerimaan-pdf', [
            'laporan' => $laporan,
            'filters' => $filters,
            'settings' => $settings,
        ])->setPaper('a4', 'portrait');

        return $pdf->download('laporan-penerimaan.pdf');
    }

    public function penerimaanExcel(Request $request)
    {
        $filters = $request->only(['date_from', 'date_to', 'account_id']);

        return Excel::download(
            new LaporanPenerimaanExport(
                $filters['date_from'] ?? null,
                $filters['date_to'] ?? null,
                $filters['account_id'] ?? null
            ),
            'laporan-penerimaan.xlsx'
        );
    }

    public function pengeluaranPdf(Request $request)
    {
        $filters = $request->only(['date_from', 'date_to', 'account_id']);
        $laporan = $this->laporanService->getLaporanPengeluaran(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null,
            $filters['account_id'] ?? null
        );

        $settings = Setting::getGroup('general');

        $pdf = Pdf::loadView('exports.pengeluaran-pdf', [
            'laporan' => $laporan,
            'filters' => $filters,
            'settings' => $settings,
        ])->setPaper('a4', 'portrait');

        return $pdf->download('laporan-pengeluaran.pdf');
    }

    public function pengeluaranExcel(Request $request)
    {
        $filters = $request->only(['date_from', 'date_to', 'account_id']);

        return Excel::download(
            new LaporanPengeluaranExport(
                $filters['date_from'] ?? null,
                $filters['date_to'] ?? null,
                $filters['account_id'] ?? null
            ),
            'laporan-pengeluaran.xlsx'
        );
    }

    public function kuitansiPenerimaan($id)
    {
        $penerimaan = \App\Models\Penerimaan::with(['account', 'user'])->findOrFail($id);
        $settings = Setting::getGroup('general');

        $pdf = Pdf::loadView('exports.kuitansi-penerimaan', [
            'penerimaan' => $penerimaan,
            'settings' => $settings,
        ])->setPaper([0, 0, 226, 138], 'portrait'); // F7 size

        return $pdf->download("kuitansi-{$penerimaan->nomor_transaksi}.pdf");
    }

    public function kuitansiPengeluaran($id)
    {
        $pengeluaran = \App\Models\Pengeluaran::with(['account', 'user'])->findOrFail($id);
        $settings = Setting::getGroup('general');

        $pdf = Pdf::loadView('exports.kuitansi-pengeluaran', [
            'pengeluaran' => $pengeluaran,
            'settings' => $settings,
        ])->setPaper([0, 0, 226, 138], 'portrait');

        return $pdf->download("kuitansi-{$pengeluaran->nomor_transaksi}.pdf");
    }
}
