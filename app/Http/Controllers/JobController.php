<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        return Job::orderBy('applied_date', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
                    'company' => 'required|string|max:255',
                     'title' => 'required|string|max:255',
                    'location' => 'required|string|max:255',
                    'applied_date' => 'required|date',
                    'status' => 'required|in:Applied,Interviewing,Offer,Rejected,Accepted',
                    'notes' => 'nullable|string',
                    ]);

        $job = Job::create($validated);

        return response()->json($job, 201);
    }
}
