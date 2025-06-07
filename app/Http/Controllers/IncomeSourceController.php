<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncomeSource;

class IncomeSourceController extends Controller
{
    public function index()
    {
        return IncomeSource::all();
    }
}
