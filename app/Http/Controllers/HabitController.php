<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;

class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function apiIndex()
    {
        $habits = Habit::with('completions')->get();
        return response()->json($habits);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'frequency' => 'required|in:daily,weekly',
            'start_date' => 'required|date',
            'notes' => 'nullable|string',
            'weekly_target' => 'nullable|integer|min:1|max:7',
        ]);

        $data['user_id'] = 1; // TEMP: hardcode for testing

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

    public function destroy(Habit $habit)
    {
        $habit->delete();

        return response()->json(['message' => 'Habit deleted successfully.']);
    }

}
