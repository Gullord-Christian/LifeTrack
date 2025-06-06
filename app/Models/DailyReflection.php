<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyReflection extends Model
{
    protected $fillable = ['user_id', 'date', 'goals', 'gratitudes', 'reps_done'];

    protected $casts = [
        'goals' => 'array',
        'gratitudes' => 'array',
        'reps_done' => 'boolean',
        'date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
