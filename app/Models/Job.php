<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'job_applications';

    protected $fillable = [
        'company',
        'title',
        'location',
        'applied_date',
        'status',
        'notes',
    ];
}
