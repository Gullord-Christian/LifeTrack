<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('runs', function (Blueprint $table) {
        $table->id();
        $table->date('date');
        $table->unsignedInteger('duration_minutes');
        $table->unsignedInteger('duration_seconds');
        $table->decimal('distance', 5, 2);
        $table->unsignedInteger('avg_hr')->nullable();
        $table->text('notes')->nullable();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('runs');
    }
};
