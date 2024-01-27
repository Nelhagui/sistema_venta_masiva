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
        Schema::create('metodo_pagos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->decimal('markup', 8, 2)->nullable();
            $table->boolean('editable')->default(true);
            $table->boolean('predeterminado')->default(false);
            $table->integer('tipo_markup')->comment('0: Sin markup; 1: Porcentaje; 2: Monto fijo'); 
            $table->string('estado');
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->unsignedBigInteger('comercio_id');
            $table->foreign('comercio_id')->references('id')->on('comercios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('metodo_pagos');
    }
};
