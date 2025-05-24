<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('golf_rounds', function (Blueprint $table) {
            $table->unsignedTinyInteger('par')->nullable()->after('yardage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('golf_rounds', function (Blueprint $table) {
            $table->dropColumn('par');
        });
    }
};
