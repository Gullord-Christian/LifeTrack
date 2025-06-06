<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Set extends Model
{
    protected $fillable = ['exercise_id', 'weight', 'reps', 'rpe', 'rest_seconds'];

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
