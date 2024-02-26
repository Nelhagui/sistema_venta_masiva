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
        // Schema::create('inversor_productos', function (Blueprint $table) {
        //     $table->id();
        //     $table->morphs('model');
        //     $table->unsignedBigInteger('inversor_id'); // Quién realizó la venta

        //     $table->integer('cantidad_producto_invertido')->nullable();
        //     $table->integer('cantidad_productos_vendidos')->default(0);
        //     $table->integer('cantidad_dinero_invertido')->nullable();
        //     $table->integer('cantidad_dinero_recuperado')->default(0);
        //     $table->boolean('finalizada')->default(false);
        //     $table->timestamps();

        //     $table->foreign('inversor_id')->references('id')->on('inversores')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inversor_productos');
    }
};
