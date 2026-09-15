<?php

namespace App\Http\Controllers;

use App\Services\KasService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(protected KasService $kasService) {}

    public function index()
    {
        $kasSummary = $this->kasService->getSummary();

        return Inertia::render('Dashboard', [
            'kasSummary' => $kasSummary,
        ]);
    }
}
