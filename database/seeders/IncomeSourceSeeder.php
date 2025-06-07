<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\IncomeSource;

class IncomeSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sources = [
            ['name' => 'Paycheck', 'expected_amount' => 3000, 'notes' => 'Biweekly paycheck from employer'],
            ['name' => 'Freelance', 'expected_amount' => 1000, 'notes' => 'Variable freelance work'],
            ['name' => 'Dividends', 'expected_amount' => 200, 'notes' => 'Quarterly dividends'],
        ];

        foreach ($sources as $source) {
            IncomeSource::create($source);
        }
    }
}
