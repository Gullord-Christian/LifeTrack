<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
        return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/', function () {
        return Inertia::render('Dashboard/Dashboard');
    })->name('dashboard');

    Route::prefix('active')->name('active.')->group(function () {
        Route::get('/', fn () => Inertia::render('Trackers/Active/Index'))->name('index');
        Route::get('/lifting', fn () => Inertia::render('Trackers/Active/Lifting'))->name('lifting');
        Route::get('/running', fn () => Inertia::render('Trackers/Active/Running'))->name('running');
        Route::get('/basketball', fn () => Inertia::render('Trackers/Active/Basketball'))->name('basketball');
    });

    Route::get('/golf', function () {
        return Inertia::render('Trackers/Golf');
    })->name('golf');

    Route::get('/budgeting', function () {
        return Inertia::render('Trackers/Budgeting');
    })->name('budgeting');

    Route::get('/sleep', function () {
        return Inertia::render('Trackers/Sleep');
    })->name('sleep');

    Route::get('/habits', function () {
        return Inertia::render('Trackers/Habits');
    })->name('habits');

    Route::get('/calendar', function () {
        return Inertia::render('Trackers/Calendar');
    })->name('calendar');

    Route::get('/notes', function () {
        return Inertia::render('Trackers/Notes');
    })->name('notes');

    Route::get('/job-tracking', function () {
        return Inertia::render('Trackers/JobTracking');
    })->name('job-tracking');

    Route::get('/project-overview', function () {
    return Inertia::render('Trackers/ProjectOverview');
    })->name('project-overview');   

});

require __DIR__.'/auth.php';
