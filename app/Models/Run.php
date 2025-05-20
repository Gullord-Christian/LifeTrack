<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Run extends Model
{
    protected $fillable = [
        'date',
        'duration_minutes',
        'duration_seconds',
        'distance',
        'avg_hr',
        'notes',
    ];
}
