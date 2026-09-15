<?php

namespace App\Http\Controllers;

use App\Models\KategoriKeuangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriKeuanganController extends Controller
{
    public function index(Request $request)
    {
        $query = KategoriKeuangan::query();

        if ($request->filled('tipe')) {
            $query->where('tipe', $request->tipe);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('nama', 'like', "%{$search}%");
        }

        $kategori = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Kategori/Index', [
            'kategori' => $kategori,
            'filters' => $request->only(['tipe', 'search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kategori/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'tipe' => ['required', 'in:pemasukan,pengeluaran'],
            'deskripsi' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        KategoriKeuangan::create($validated);

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori keuangan berhasil dibuat');
    }

    public function edit(KategoriKeuangan $kategori)
    {
        return Inertia::render('Admin/Kategori/Edit', [
            'kategori' => $kategori,
        ]);
    }

    public function update(Request $request, KategoriKeuangan $kategori)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'tipe' => ['required', 'in:pemasukan,pengeluaran'],
            'deskripsi' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ]);

        $kategori->update($validated);

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori keuangan berhasil diperbarui');
    }

    public function destroy(KategoriKeuangan $kategori)
    {
        $kategori->delete();

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori keuangan berhasil dihapus');
    }
}
