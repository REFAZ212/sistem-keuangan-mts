<?php

namespace App\Http\Controllers;

use App\Services\KasService;
use Inertia\Inertia;

class KasController extends Controller
{
    public function __construct(protected KasService $kasService) {}

    public function index()
    {
        $filters = request()->only(['date_from', 'date_to']);
        $kasSummary = $this->kasService->getSaldoKas(
            $filters['date_from'] ?? null,
            $filters['date_to'] ?? null
        );

        return Inertia::render('Kas/Index', [
            'kasSummary' => $kasSummary,
            'filters' => $filters,
        ]);
    }
}
