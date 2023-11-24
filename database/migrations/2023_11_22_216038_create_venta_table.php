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
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sesion_caja_id');
            $table->unsignedBigInteger('user_id'); // Quién realizó la venta
            $table->unsignedBigInteger('metodo_pago_id'); 
            $table->decimal('monto_total_venta', 8, 2);
            $table->decimal('monto_total_costo', 8, 2);
            $table->date('fecha_venta');
            $table->string('metodo_pago_nombre');
            $table->decimal('markup', 8, 2)->nullable();
            $table->string('tipo_markup'); 
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->foreign('sesion_caja_id')->references('id')->on('sesiones_caja')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('metodo_pago_id')->references('id')->on('metodo_pagos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
