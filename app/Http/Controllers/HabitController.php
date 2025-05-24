<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;

class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $habits = Habit::with('completions')->get();

        return inertia('/Habits/Habits', compact('habits'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'frequency' => 'required|in:daily,weekly',
            'start_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $data['user_id'] = 2; // TEMP: hardcode for testing

        Habit::create($data);

        return response()->json(['message' => 'Habit created.'], 201);
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
