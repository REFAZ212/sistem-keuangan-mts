<?php

namespace App\Exports;

use App\Models\Pengeluaran;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LaporanPengeluaranExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected ?string $dateFrom;
    protected ?string $dateTo;
    protected ?int $accountId;

    public function __construct(?string $dateFrom = null, ?string $dateTo = null, ?int $accountId = null)
    {
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
        $this->accountId = $accountId;
    }

    public function query()
    {
        return Pengeluaran::with(['account', 'user'])
            ->where('status', 'disetujui')
            ->when($this->dateFrom, fn ($q) => $q->where('tanggal', '>=', $this->dateFrom))
            ->when($this->dateTo, fn ($q) => $q->where('tanggal', '<=', $this->dateTo))
            ->when($this->accountId, fn ($q) => $q->where('account_id', $this->accountId))
            ->orderBy('tanggal');
    }

    public function headings(): array
    {
        return ['No. Transaksi', 'Tanggal', 'Rekening', 'Keterangan', 'Oleh', 'Jumlah (Rp)'];
    }

    public function map($pengeluaran): array
    {
        return [
            $pengeluaran->nomor_transaksi,
            $pengeluaran->tanggal->format('d/m/Y'),
            $pengeluaran->account->kode . ' - ' . $pengeluaran->account->nama,
            $pengeluaran->keterangan ?? '-',
            $pengeluaran->user->name,
            number_format($pengeluaran->jumlah, 2, ',', '.'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
