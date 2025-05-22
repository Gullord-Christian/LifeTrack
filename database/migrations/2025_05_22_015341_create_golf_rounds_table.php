<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('golf_rounds', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('course')->nullable();
            $table->integer('score');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('golf_rounds');
    }
};
