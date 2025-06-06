<?php

namespace App\Http\Controllers;

use App\Models\GolfRound;
use Illuminate\Http\Request;

class GolfRoundController extends Controller
{
    public function index()
    {
        return GolfRound::orderByDesc('date')->get();
    }

    public function last()
    {
        return GolfRound::orderByDesc('date')->first();
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
        'date' => 'required|date',
        'course' => 'nullable|string|max:255',
        'score' => 'required|integer|min:0',
        'notes' => 'nullable|string',
        'greens_in_regulation' => 'nullable|integer|min:0|max:18',
        'fairways_in_regulation' => 'nullable|integer|min:0|max:14',
        'course_rating' => 'nullable|numeric|min:60|max:80',
        'course_slope' => 'nullable|integer|min:55|max:155',
        'yardage' => 'nullable|integer|min:4000|max:8000',
        'par' => 'nullable|integer|min:60|max:80',
        'putts' => 'nullable|integer|min:5|max:50'
]);

        return GolfRound::create($validated);
    }

    public function destroy(GolfRound $golfRound)
    {
        $golfRound->delete();
        return response()->noContent();
    }

}
