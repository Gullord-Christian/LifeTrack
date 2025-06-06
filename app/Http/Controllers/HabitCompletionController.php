<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitCompletion;
use Illuminate\Http\Request;

class HabitCompletionController extends Controller
{
    public function store(Request $request, Habit $habit)
    {
        $request->validate([
            'completed_date' => 'required|date',
        ]);

        $completion = HabitCompletion::firstOrCreate([
            'habit_id' => $habit->id,
            'completed_date' => $request->completed_date,
        ]);

        return response()->json($completion, 201);
    }

    public function destroy(Request $request, Habit $habit)
    {
        $request->validate([
            'completed_date' => 'required|date',
        ]);

        $habit->completions()
            ->where('completed_date', $request->completed_date)
            ->delete();

        return response()->json(['message' => 'Uncompleted'], 204);
    }

}
