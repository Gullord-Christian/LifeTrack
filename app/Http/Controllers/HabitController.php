<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Habit;
use App\Models\HabitCompletion;
use Illuminate\Support\Facades\Auth;

class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        // TEMP: Get all habits (in production you'd filter by user)
        $habits = Habit::all();

        return inertia('/Habits/Habits', compact('habits'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'frequency' => 'required|in:daily,weekly',
            'notes' => 'nullable|string',
            'start_date' => 'required|date',
        ]);

        // TEMP: Hardcoded user_id until auth is added
        $data['user_id'] = 1;

        $habit = Habit::create($data);

        return redirect()->route('habits.index');
    }

    public function show(string $id)
    {
        return Habit::findOrFail($id);
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        Habit::findOrFail($id)->delete();
        return redirect()->route('habits.index');
    }
}
