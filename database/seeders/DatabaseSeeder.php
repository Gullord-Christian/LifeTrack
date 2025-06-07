<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\BudgetEntry;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            CategorySeeder::class,
            IncomeSourceSeeder::class,
            DebtSeeder::class,
        ]);

        \App\Models\BudgetEntry::factory(10)->create();

    }
}
