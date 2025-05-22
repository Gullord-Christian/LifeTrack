<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('golf_rounds', function (Blueprint $table) {
            $table->unsignedTinyInteger('greens_in_regulation')->nullable();
            $table->unsignedTinyInteger('fairways_in_regulation')->nullable();
            $table->decimal('course_rating', 4, 1)->nullable(); // e.g., 71.2
            $table->unsignedSmallInteger('course_slope')->nullable(); // e.g., 130
            $table->unsignedSmallInteger('yardage')->nullable(); // e.g., 6400
        });
    }

    public function down(): void
    {
        Schema::table('golf_rounds', function (Blueprint $table) {
            $table->dropColumn([
                'greens_in_regulation',
                'fairways_in_regulation',
                'course_rating',
                'course_slope',
                'yardage',
            ]);
        });
    }
};