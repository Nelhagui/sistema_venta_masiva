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
        Schema::create('stock_movimientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('producto_id'); // Suponiendo que tienes un modelo Producto
            $table->string('descripcion');
            $table->integer('cantidad');
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade'); // Suponiendo que la tabla de productos se llama 'productos'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movimientos');
    }
};
