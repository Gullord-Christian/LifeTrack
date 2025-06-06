<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    public function index()
    {
        $workouts = Workout::with('exercises.sets')->where('user_id', auth()->id())->latest()->get();
        return response()->json($workouts);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'name' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'exercises' => 'array|required',
            'exercises.*.name' => 'required|string',
            'exercises.*.sets' => 'array',
            'exercises.*.sets.*.weight' => 'nullable|numeric',
            'exercises.*.sets.*.reps' => 'nullable|integer',
            'exercises.*.sets.*.rpe' => 'nullable|numeric',
            'exercises.*.sets.*.rest_seconds' => 'nullable|integer',
        ]);

        $workout = Workout::create([
            'user_id' => auth()->id(),
            'date' => $data['date'],
            'name' => $data['name'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);

        foreach ($data['exercises'] as $exerciseData) {
            $exercise = $workout->exercises()->create([
                'name' => $exerciseData['name'],
            ]);

            foreach ($exerciseData['sets'] ?? [] as $setData) {
                $exercise->sets()->create($setData);
            }
        }

        return response()->json(['message' => 'Workout created successfully']);
    }

    public function show(Workout $workout)
    {
        $this->authorize('view', $workout);
        return response()->json($workout->load('exercises.sets'));
    }

    public function destroy(Workout $workout)
    {
        $this->authorize('delete', $workout);
        $workout->delete();

        return response()->json(['message' => 'Workout deleted.']);
    }
}
