<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HabitCompletion extends Model
{
    protected $fillable = [
        'habit_id', 'completed_at', 'note',
    ];

    protected $dates = ['completed_at'];

    public function habit()
    {
        return $this->belongsTo(Habit::class);
    }
}
