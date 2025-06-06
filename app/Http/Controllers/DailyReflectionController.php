<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DailyReflection;

class DailyReflectionController extends Controller
{
    public function showToday(Request $request)
    {
        $reflection = DailyReflection::where('user_id', $request->user()->id)
            ->whereDate('date', today())
            ->first();

        return response()->json($reflection);
    }

    public function storeOrUpdate(Request $request)
    {
        $data = $request->validate([
            'goals' => 'nullable|array',
            'gratitudes' => 'nullable|array',
            'reps_done' => 'nullable|boolean',
        ]);

        $reflection = DailyReflection::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'date' => today(),
            ],
            $data
        );

        return response()->json($reflection);
    }
}
