<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debts extends Model
{
    protected $fillable = [
        'name',
        'original_amount',
        'remaining_amount',
        'monthly_due',
        'due_date',
        'type',
    ];

    public function budgetEntries()
    {
        return $this->hasMany(BudgetEntry::class);
    }
}
