<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePenerimaanRequest;
use App\Http\Requests\UpdatePenerimaanRequest;
use App\Models\Penerimaan;
use App\Services\AccountService;
use App\Services\PenerimaanService;
use App\Models\KategoriKeuangan;
use Inertia\Inertia;

class PenerimaanController extends Controller
{
    public function __construct(
        protected PenerimaanService $penerimaanService,
        protected AccountService $accountService
    ) {}

    public function index()
    {
        $filters = request()->only(['status', 'account_id', 'date_from', 'date_to', 'page']);
        $penerimaan = $this->penerimaanService->all($filters);
        $accounts = $this->accountService->all();

        return Inertia::render('Penerimaan/Index', [
            'penerimaan' => $penerimaan,
            'accounts' => $accounts,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        $accounts = $this->accountService->all();
        $kategori = KategoriKeuangan::where('tipe', 'pemasukan')->where('is_active', true)->get();
        $nomorTransaksi = Penerimaan::generateNomorTransaksi();

        return Inertia::render('Penerimaan/Create', [
            'accounts' => $accounts,
            'kategori' => $kategori,
            'nomorTransaksi' => $nomorTransaksi,
        ]);
    }

    public function store(StorePenerimaanRequest $request)
    {
        $this->penerimaanService->create($request->validated());

        return redirect()->route('penerimaan.index')
            ->with('success', 'Penerimaan berhasil dibuat');
    }

    public function show(Penerimaan $penerimaan)
    {
        $penerimaan->load(['account', 'user', 'kategori']);

        return Inertia::render('Penerimaan/Show', [
            'penerimaan' => $penerimaan,
        ]);
    }

    public function edit(Penerimaan $penerimaan)
    {
        if ($penerimaan->status === 'disetujui') {
            return redirect()->route('penerimaan.index')
                ->with('error', 'Tidak dapat mengedit data yang sudah disetujui');
        }

        $accounts = $this->accountService->all();
        $kategori = KategoriKeuangan::where('tipe', 'pemasukan')->where('is_active', true)->get();

        return Inertia::render('Penerimaan/Edit', [
            'penerimaan' => $penerimaan,
            'accounts' => $accounts,
            'kategori' => $kategori,
        ]);
    }

    public function update(UpdatePenerimaanRequest $request, Penerimaan $penerimaan)
    {
        $this->penerimaanService->update($penerimaan, $request->validated());

        return redirect()->route('penerimaan.index')
            ->with('success', 'Penerimaan berhasil diperbarui');
    }

    public function approve(Penerimaan $penerimaan)
    {
        $this->penerimaanService->approve($penerimaan);

        return redirect()->route('penerimaan.index')
            ->with('success', 'Penerimaan berhasil disetujui');
    }

    public function destroy(Penerimaan $penerimaan)
    {
        $this->penerimaanService->delete($penerimaan);

        return redirect()->route('penerimaan.index')
            ->with('success', 'Penerimaan berhasil dihapus');
    }
}
