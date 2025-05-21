<?php

use App\Http\Controllers\RunController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/runs', [RunController::class, 'index']);
Route::post('/runs', [RunController::class, 'store']);
Route::put('/runs/{run}', [RunController::class, 'update']);
Route::delete('/runs/{run}', [RunController::class, 'destroy']);

Route::get('/quote-of-the-day', function () {
    $response = Http::get('https://zenquotes.io/api/today');

    return response()->json($response->json());
});
