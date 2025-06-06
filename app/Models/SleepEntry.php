<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SleepEntry extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'bed_time',
        'wake_time',
        'time_in_bed_minutes',
        'actual_sleep_minutes',
        'sleep_score',
        'awake_minutes',
        'rem_minutes',
        'light_minutes',
        'deep_minutes',
    ];

    protected $casts = [
        'date' => 'date',
        'bed_time' => 'datetime',
        'wake_time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
