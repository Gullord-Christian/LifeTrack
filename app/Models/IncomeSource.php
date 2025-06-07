<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomeSource extends Model
{
    protected $fillable = ['name', 'expected_amount', 'notes'];

    public function budgetEntries()
    {
        return $this->hasMany(BudgetEntry::class);
    }
}
