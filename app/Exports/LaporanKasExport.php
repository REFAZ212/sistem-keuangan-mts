<?php

namespace App\Exports;

use App\Models\Penerimaan;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LaporanKasExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected ?string $dateFrom;
    protected ?string $dateTo;

    public function __construct(?string $dateFrom = null, ?string $dateTo = null)
    {
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
    }

    public function query()
    {
        return Penerimaan::with(['account'])
            ->where('status', 'disetujui')
            ->when($this->dateFrom, fn ($q) => $q->where('tanggal', '>=', $this->dateFrom))
            ->when($this->dateTo, fn ($q) => $q->where('tanggal', '<=', $this->dateTo))
            ->orderBy('tanggal');
    }

    public function headings(): array
    {
        return ['No. Transaksi', 'Tanggal', 'Rekening', 'Keterangan', 'Jumlah (Rp)'];
    }

    public function map($penerimaan): array
    {
        return [
            $penerimaan->nomor_transaksi,
            $penerimaan->tanggal->format('d/m/Y'),
            $penerimaan->account->kode . ' - ' . $penerimaan->account->nama,
            $penerimaan->keterangan ?? '-',
            number_format($penerimaan->jumlah, 2, ',', '.'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
