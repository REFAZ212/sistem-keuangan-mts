<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kuitansi Pengeluaran</title>
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 10pt; color: #000; margin: 0; padding: 20px; }
        .receipt { border: 2px solid #000; padding: 15px; max-width: 350px; }
        .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 8px; margin-bottom: 10px; }
        .header h3 { margin: 0; font-size: 12pt; }
        .header p { margin: 2px 0; font-size: 9pt; }
        .row { display: flex; justify-content: space-between; margin: 4px 0; }
        .label { font-weight: bold; width: 100px; }
        .divider { border-top: 1px dashed #000; margin: 8px 0; }
        .total { font-size: 12pt; font-weight: bold; text-align: right; margin-top: 8px; }
        .terbilang { font-style: italic; font-size: 9pt; text-align: center; margin-top: 5px; }
        .footer { margin-top: 15px; text-align: right; font-size: 9pt; }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h3>{{ $settings['nama_sekolah'] ?? 'Sistem Keuangan MTs' }}</h3>
            <p>{{ $settings['alamat'] ?? '' }}</p>
            <p style="font-weight: bold; margin-top: 5px;">KUITANSI PENGELUARAN</p>
        </div>

        <div class="row"><span class="label">No. Transaksi</span><span>{{ $pengeluaran->nomor_transaksi }}</span></div>
        <div class="row"><span class="label">Tanggal</span><span>{{ $pengeluaran->tanggal->format('d/m/Y') }}</span></div>
        <div class="row"><span class="label">Rekening</span><span>{{ $pengeluaran->account->kode }} - {{ $pengeluaran->account->nama }}</span></div>
        <div class="row"><span class="label">Keterangan</span><span>{{ $pengeluaran->keterangan ?? '-' }}</span></div>

        <div class="divider"></div>

        <div class="total">Rp {{ number_format($pengeluaran->jumlah, 2, ',', '.') }}</div>
        <div class="terbilang">Terbilang: {{ terbilang($pengeluaran->jumlah) }} Rupiah</div>

        <div class="divider"></div>

        <div class="footer">
            <p>Dikeluarkan oleh,</p>
            <p style="margin-top: 40px;">({{ $pengeluaran->user->name ?? '................' }})</p>
            <p>Bendahara</p>
        </div>
    </div>
</body>
</html>
