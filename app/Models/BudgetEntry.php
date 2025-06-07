<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BudgetEntry extends Model
{
    use HasFactory;

    protected $fillable = [
       'date',
       'description',
       'category_id',
       'debt_id',
       'income_source_id',
       'amount',
       'is_recurring',
       'is_income',
       'paid_on',
       'is_paid',
    ];

    public function category()
    {
        return $this->belongsTo(BudgetCategory::class);
    }

    public function debt()
    {
        return $this->belongsTo(Debts::class);
    }

    public function incomeSource()
    {
        return $this->belongsTo(IncomeSource::class);
    }
}
