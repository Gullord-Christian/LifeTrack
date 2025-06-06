<?php

use App\Http\Controllers\BudgetEntryController;
use App\Http\Controllers\GolfRoundController;
use App\Http\Controllers\HabitCompletionController;
use App\Http\Controllers\DailyReflectionController;
use App\Http\Controllers\SleepEntryController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\RunController;
use App\Http\Controllers\RunImportController;
use App\Http\Controllers\BudgetCategoryController;
use App\Http\Controllers\IncomeSourceController;
use App\Http\Controllers\DebtController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

// Dashboard
Route::get('/quote-of-the-day', function () {
    $response = Http::get('https://zenquotes.io/api/today');

    return response()->json($response->json());
});

Route::get('/runs/yesterday', [RunController::class, 'yesterday']);

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
Route::get('/habits', [HabitController::class, 'apiIndex']);
Route::post('/habits', [HabitController::class, 'store']);
Route::delete('/habits/{habit}', [HabitController::class, 'destroy']);

Route::post('/habits/{habit}/complete', [HabitCompletionController::class, 'store']);
Route::delete('/habits/{habit}/complete', [HabitCompletionController::class, 'destroy'])->name('habits.uncomplete');

// Jobs
Route::get('/jobs', [JobController::class, 'index']);
Route::post('/jobs', [JobController::class, 'store']);

// Run Import
Route::post('/runs/import', [RunImportController::class, 'import']);

Route::get('/daily-reflection', [DailyReflectionController::class, 'showToday']);
Route::post('/daily-reflection', [DailyReflectionController::class, 'storeOrUpdate']);

// Workouts
Route::get('/workouts', [WorkoutController::class, 'index']);
Route::post('/workouts', [WorkoutController::class, 'store']);
Route::get('/workouts/{workout}', [WorkoutController::class, 'show']);
Route::delete('/workouts/{workout}', [WorkoutController::class, 'destroy']);

// Sleep
Route::get('/sleep', [SleepEntryController::class, 'index']);
Route::post('/sleep', [SleepEntryController::class, 'store']);
Route::delete('/sleep/{sleepEntry}', [SleepEntryController::class, 'destroy']);

// Finance
Route::get('/categories', [BudgetCategoryController::class, 'index']);
Route::get('/debts', [DebtController::class, 'index']);
Route::get('/income-sources', [IncomeSourceController::class, 'index']);
