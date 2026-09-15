<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Kas</title>
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; color: #000; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .header h2 { margin: 0; font-size: 14pt; }
        .header p { margin: 2px 0; font-size: 10pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #000; padding: 6px 8px; font-size: 10pt; }
        th { background-color: #f0f0f0; font-weight: bold; }
        .text-right { text-align: right; }
        .total-row { background-color: #e8e8e8; font-weight: bold; }
        .signature { margin-top: 40px; display: flex; justify-content: space-between; }
        .signature div { width: 45%; text-align: center; }
        .signature .line { border-top: 1px solid #000; margin-top: 50px; width: 80%; margin-left: auto; margin-right: auto; }
    </style>
</head>
<body>
    <div class="header">
        <h2>{{ $settings['nama_sekolah'] ?? 'Sistem Keuangan MTs' }}</h2>
        <p>{{ $settings['alamat'] ?? '' }}</p>
        <p>Telp: {{ $settings['telepon'] ?? '-' }} | Email: {{ $settings['email_sekolah'] ?? '-' }}</p>
        <h3>LAPORAN KAS</h3>
        @if(!empty($filters['date_from']) || !empty($filters['date_to']))
        <p>Periode: {{ \Carbon\Carbon::parse($filters['date_from'] ?? now())->format('d/m/Y') }} — {{ \Carbon\Carbon::parse($filters['date_to'] ?? now())->format('d/m/Y') }}</p>
        @endif
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>No. Transaksi</th>
                <th>Tanggal</th>
                <th>Rekening</th>
                <th>Keterangan</th>
                <th class="text-right">Penerimaan (Rp)</th>
                <th class="text-right">Pengeluaran (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($laporan['accounts'] as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td colspan="5"><strong>{{ $item['account']['kode'] }} - {{ $item['account']['nama'] }}</strong></td>
                <td class="text-right"></td>
                <td class="text-right"></td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="5"><strong>TOTAL</strong></td>
                <td class="text-right"><strong>Rp {{ number_format($laporan['grand_total']['total_penerimaan'], 2, ',', '.') }}</strong></td>
                <td class="text-right"><strong>Rp {{ number_format($laporan['grand_total']['total_pengeluaran'], 2, ',', '.') }}</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="signature">
        <div>
            <p>Bendahara</p>
            <div class="line"></div>
            <p>({{ $settings['bendahara_nama'] ?? '................' }})</p>
            @if(!empty($settings['bendahara_nip']))
            <p>NIP. {{ $settings['bendahara_nip'] }}</p>
            @endif
        </div>
        <div>
            <p>Kepala Madrasah</p>
            <div class="line"></div>
            <p>({{ $settings['kepala_sekolah'] ?? '................' }})</p>
            @if(!empty($settings['nip_kepala_sekolah']))
            <p>NIP. {{ $settings['nip_kepala_sekolah'] }}</p>
            @endif
        </div>
    </div>
</body>
</html>
