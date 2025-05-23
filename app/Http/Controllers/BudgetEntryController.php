<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BudgetEntry;

class BudgetEntryController extends Controller
{
    public function index()
    {
        return BudgetEntry::orderByDesc('date')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'notes' => 'nullable|string',
        ]);

        return BudgetEntry::create($validated);
    }

    public function destroy(BudgetEntry $budgetEntry)
    {
        $budgetEntry->delete();
        return response()->noContent();
    }
}
