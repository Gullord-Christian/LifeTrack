<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Debts;

class DebtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $debts = [
            [
                'name' => 'Toyota Loan',
                'original_amount' => 20000,
                'remaining_amount' => 8500,
                'monthly_due' => 350,
                'due_date' => now()->addDays(10),
                'type' => 'car',
            ],
            [
                'name' => 'Student Loan',
                'original_amount' => 40000,
                'remaining_amount' => 25000,
                'monthly_due' => 250,
                'due_date' => now()->addDays(15),
                'type' => 'student',
            ],
            [
                'name' => 'Credit Card',
                'original_amount' => 5000,
                'remaining_amount' => 1200,
                'monthly_due' => 150,
                'due_date' => now()->addDays(5),
                'type' => 'credit_card',
            ],
        ];

        foreach ($debts as $debt) {
            Debts::create($debt);
        }
    }
}
