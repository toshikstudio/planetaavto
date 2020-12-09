<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DopToSalonLabels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('salon_labels', function (Blueprint $table) {
            $table->bigInteger('subsalon_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('salon_labels', function (Blueprint $table) {
            $table->dropColumn('subsalon_id');
        });
    }
}
