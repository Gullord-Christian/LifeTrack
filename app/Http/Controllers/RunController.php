<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Run;

class RunController extends Controller
{
    public function index()
    {
        $runs = Run::orderByDesc('date')
                ->get()
                ->map(fn($run) => $this->formatRun($run));

        return response()->json($runs);
    }

    public function yesterday()
    {
        $run = Run::whereDate('date', now()->subDay()->toDateString())->first();

        return response()->json($run);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'duration.minutes' => 'required|integer|min:0',
            'duration.seconds' => 'required|integer|min:0|max:59',
            'distance' => 'required|numeric|min:0',
            'avgHr' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        $run = Run::create([
            'date' => $validated['date'],
            'duration_minutes' => $validated['duration']['minutes'],
            'duration_seconds' => $validated['duration']['seconds'],
            'distance' => $validated['distance'],
            'avg_hr' => $validated['avgHr'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json($this->formatRun($run), 201);
    }

    public function update(Request $request, Run $run)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'duration.minutes' => 'required|integer|min:0',
            'duration.seconds' => 'required|integer|min:0|max:59',
            'distance' => 'required|numeric|min:0',
            'avgHr' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        $run->update([
            'date' => $validated['date'],
            'duration_minutes' => $validated['duration']['minutes'],
            'duration_seconds' => $validated['duration']['seconds'],
            'distance' => $validated['distance'],
            'avg_hr' => $validated['avgHr'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json($this->formatRun($run));
    }

    public function destroy(Run $run)
    {
        $run->delete();
        return response()->json(['message' => 'Run deleted']);
    }

    private function formatRun(Run $run): array
    {
        return [
            'id' => $run->id,
            'date' => $run->date,
            'distance' => $run->distance,
            'avgHr' => $run->avg_hr,
            'notes' => $run->notes,
            'duration' => [
                'minutes' => $run->duration_minutes,
                'seconds' => $run->duration_seconds,
            ],
        ];
    }
}
