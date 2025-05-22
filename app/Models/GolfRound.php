<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GolfRound extends Model
{
      protected $fillable = [
        'date',
        'course',
        'score',
        'notes',
        'greens_in_regulation',
        'fairways_in_regulation',
        'course_rating',
        'course_slope',
        'yardage',
    ];
}
