<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Debts;

class DebtController extends Controller
{
    public function index()
    {
        return Debts::all();
    }
}
