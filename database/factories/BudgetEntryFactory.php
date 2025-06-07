<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\BudgetEntry;
use App\Models\BudgetCategory;
use App\Models\Debts;
use App\Models\IncomeSource;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BudgetEntry>
 */
class BudgetEntryFactory extends Factory
{
    protected $model = BudgetEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'date' => $this->faker->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
           'description' => $this->faker->sentence,
           'category_id' => BudgetCategory::inRandomOrder()->value('id'),
           'debt_id' => rand(0, 1) ? Debts::inRandomOrder()->value('id') : null,
           'income_source_id' => rand(0, 1) ? IncomeSource::inRandomOrder()->value('id') : null,
           'amount' => $this->faker->randomFloat(2, -250, 250),
           'is_recurring' => $this->faker->boolean(20),
           'is_income' => $this->faker->boolean(30),
           'paid_on' => $this->faker->boolean(80) ? $this->faker->dateTimeBetween('-20 days', 'now') : null,
           'is_paid' => $this->faker->boolean(90),
        ];
    }
}
