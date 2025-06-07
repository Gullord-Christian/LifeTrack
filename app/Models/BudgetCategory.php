<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetCategory extends Model
{
    protected $fillable = ['name', 'icon', 'color'];

    public function budgetEntries()
    {
        return $this->hasMany(BudgetEntry::class);
    }
}
