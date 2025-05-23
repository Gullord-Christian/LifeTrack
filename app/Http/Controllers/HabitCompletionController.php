<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Habit;
use App\Models\HabitCompletion;

class HabitCompletionController extends Controller
{
    public function store(Request $request, Habit $habit)
    {
        $request->validate([
            'completed_date' => 'required|date',
        ]);

        HabitCompletion::firstOrCreate([
            'habit_id' => $habit->id,
            'completed_date' => $request->completed_date,
        ]);

        return back();
    }

    public function destroy(Request $request, Habit $habit)
    {
        $request->validate([
            'completed_date' => 'required|date',
        ]);

        $habit->completions()
            ->where('completed_date', $request->completed_date)
            ->delete();

        return back();
    }
}
