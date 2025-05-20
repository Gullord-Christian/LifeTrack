<?php

use App\Http\Controllers\RunController;
use Illuminate\Support\Facades\Route;

Route::get('/runs', [RunController::class, 'index']);
Route::post('/runs', [RunController::class, 'store']);
Route::put('/runs/{run}', [RunController::class, 'update']);
Route::delete('/runs/{run}', [RunController::class, 'destroy']);
