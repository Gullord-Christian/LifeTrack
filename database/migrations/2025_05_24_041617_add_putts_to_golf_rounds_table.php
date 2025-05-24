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
            $table->unsignedTinyInteger('putts')->nullable()->after('fairways_in_regulation');
        });
    }

    public function down()
    {
        Schema::table('golf_rounds', function (Blueprint $table) {
            $table->dropColumn('putts');
        });
    }
};
