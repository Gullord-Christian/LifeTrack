<?php

use App\Http\Controllers\RunController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Models\Run;
use Carbon\Carbon;


// Dashboard
Route::get('/quote-of-the-day', function () {
    $response = Http::get('https://zenquotes.io/api/today');

    return response()->json($response->json());
});

Route::get('/runs/today', function () {
    return Run::whereDate('date', Carbon::today())->first();
});

// Run  Tracker
Route::get('/runs', [RunController::class, 'index']);
Route::post('/runs', [RunController::class, 'store']);
Route::put('/runs/{run}', [RunController::class, 'update']);
Route::delete('/runs/{run}', [RunController::class, 'destroy']);
