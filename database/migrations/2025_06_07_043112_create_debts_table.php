<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('debts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('original_amount', 10, 2);
            $table->decimal('remaining_amount', 10, 2);
            $table->decimal('monthly_due', 10, 2)->nullable();
            $table->date('due_date')->nullable();
            $table->enum('type', ['car', 'student', 'credit_card', 'other']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('debts');
    }
};
