<?php

namespace App\Http\Controllers;

use App\Models\SleepEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SleepEntryController extends Controller
{
    public function index(Request $request)
    {

        return SleepEntry::orderByDesc('date')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'bed_time' => 'nullable|string',
            'wake_time' => 'nullable|string',
            'time_in_bed_minutes' => 'nullable|integer',
            'actual_sleep_minutes' => 'nullable|integer',
            'sleep_score' => 'nullable|integer|min:0|max:100',
            'awake_minutes' => 'nullable|integer',
            'rem_minutes' => 'nullable|integer',
            'light_minutes' => 'nullable|integer',
            'deep_minutes' => 'nullable|integer',

        ]);

        $validated['user_id'] = 1;

        $entry = SleepEntry::create($validated);

        return response()->json($entry, 201);
    }

    public function destroy(SleepEntry $sleepEntry)
    {
        if ($sleepEntry->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $sleepEntry->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
