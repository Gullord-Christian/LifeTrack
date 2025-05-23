<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    protected $fillable = [
        'user_id', 'name', 'notes', 'frequency', 'start_date',
        'streak', 'last_completed_at', 'archived_at',
    ];

    protected $dates = ['start_date', 'last_completed_at', 'archived_at'];

    public function completions()
    {
        return $this->hasMany(HabitCompletion::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

