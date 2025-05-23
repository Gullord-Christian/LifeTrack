<?php

use App\Http\Controllers\RunController;
use App\Http\Controllers\BudgetEntryController;
use App\Http\Controllers\GolfRoundController;
use App\Http\Controllers\HabitCompletionController;
use App\Http\Controllers\HabitController;
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


// Golf Tracker
Route::get('/golf/last', [GolfRoundController::class, 'last']);
Route::post('/golf', [GolfRoundController::class, 'store']);
Route::delete('/golf/{golfRound}', [GolfRoundController::class, 'destroy']);
Route::get('/golf', [GolfRoundController::class, 'index']);


// Budget
Route::get('/budget', [BudgetEntryController::class, 'index']);
Route::post('/budget', [BudgetEntryController::class, 'store']);
Route::delete('/budget/{budgetEntry}', [BudgetEntryController::class, 'destroy']);

// Habits
Route::resource('habits', HabitController::class);
Route::post('/habits/{habit}/complete', [HabitCompletionController::class, 'store']);
Route::delete('/habits/{habit}/complete', [HabitCompletionController::class, 'destroy'])->name('habits.uncomplete');
