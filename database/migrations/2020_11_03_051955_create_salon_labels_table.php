<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalonLabelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salon_labels', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('salon_id');
            $table->integer('coordx');
            $table->integer('coordy');
            $table->char('color',50);
            $table->string('title');
            $table->longtext('brands');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salon_labels');
    }
}
