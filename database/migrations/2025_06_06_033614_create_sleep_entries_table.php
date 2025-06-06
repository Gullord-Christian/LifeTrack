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
        Schema::create('sleep_entries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('date')->unique();

            $table->dateTime('bed_time')->nullable();
            $table->dateTime('wake_time')->nullable();

            $table->integer('time_in_bed_minutes')->nullable();      // e.g. 468 (7h48m)
            $table->integer('actual_sleep_minutes')->nullable();     // e.g. 424 (7h4m)

            $table->integer('sleep_score')->nullable();              // e.g. 82

            // Sleep stages in minutes
            $table->integer('awake_minutes')->nullable();
            $table->integer('rem_minutes')->nullable();
            $table->integer('light_minutes')->nullable();
            $table->integer('deep_minutes')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sleep_entries');
    }
};
