<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GolfRound;

class RunController extends Controller
{
    public function index() {

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
    ]);

    return GolfRound::create($validated);
}

   
}
