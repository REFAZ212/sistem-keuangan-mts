<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengeluaranRequest;
use App\Http\Requests\UpdatePengeluaranRequest;
use App\Models\Pengeluaran;
use App\Services\AccountService;
use App\Services\PengeluaranService;
use App\Models\KategoriKeuangan;
use Inertia\Inertia;

class PengeluaranController extends Controller
{
    public function __construct(
        protected PengeluaranService $pengeluaranService,
        protected AccountService $accountService
    ) {}

    public function index()
    {
        $filters = request()->only(['status', 'account_id', 'date_from', 'date_to', 'page']);
        $pengeluaran = $this->pengeluaranService->all($filters);
        $accounts = $this->accountService->getKasAccounts();

        return Inertia::render('Pengeluaran/Index', [
            'pengeluaran' => $pengeluaran,
            'accounts' => $accounts,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        $accounts = $this->accountService->getKasAccounts();
        $kategori = KategoriKeuangan::where('tipe', 'pengeluaran')->where('is_active', true)->get();
        $nomorTransaksi = Pengeluaran::generateNomorTransaksi();

        return Inertia::render('Pengeluaran/Create', [
            'accounts' => $accounts,
            'kategori' => $kategori,
            'nomorTransaksi' => $nomorTransaksi,
        ]);
    }

    public function store(StorePengeluaranRequest $request)
    {
        $this->pengeluaranService->create($request->validated());

        return redirect()->route('pengeluaran.index')
            ->with('success', 'Pengeluaran berhasil dibuat');
    }

    public function show(Pengeluaran $pengeluaran)
    {
        $pengeluaran->load(['account', 'user', 'kategori']);

        return Inertia::render('Pengeluaran/Show', [
            'pengeluaran' => $pengeluaran,
        ]);
    }

    public function edit(Pengeluaran $pengeluaran)
    {
        if ($pengeluaran->status === 'disetujui') {
            return redirect()->route('pengeluaran.index')
                ->with('error', 'Tidak dapat mengedit data yang sudah disetujui');
        }

        $accounts = $this->accountService->getKasAccounts();
        $kategori = KategoriKeuangan::where('tipe', 'pengeluaran')->where('is_active', true)->get();

        return Inertia::render('Pengeluaran/Edit', [
            'pengeluaran' => $pengeluaran,
            'accounts' => $accounts,
            'kategori' => $kategori,
        ]);
    }

    public function update(UpdatePengeluaranRequest $request, Pengeluaran $pengeluaran)
    {
        $this->pengeluaranService->update($pengeluaran, $request->validated());

        return redirect()->route('pengeluaran.index')
            ->with('success', 'Pengeluaran berhasil diperbarui');
    }

    public function approve(Pengeluaran $pengeluaran)
    {
        $this->pengeluaranService->approve($pengeluaran);

        return redirect()->route('pengeluaran.index')
            ->with('success', 'Pengeluaran berhasil disetujui');
    }

    public function destroy(Pengeluaran $pengeluaran)
    {
        $this->pengeluaranService->delete($pengeluaran);

        return redirect()->route('pengeluaran.index')
            ->with('success', 'Pengeluaran berhasil dihapus');
    }
}
