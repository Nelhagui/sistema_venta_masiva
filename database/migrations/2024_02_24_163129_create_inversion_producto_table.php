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
        Schema::create('inversiones_productos', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad_invertida')->default(1);
            $table->decimal('monto_invertido', 10, 2)->nullable();
            $table->date('fecha_inversion')->nullable();

            // Llave foránea
            $table->unsignedBigInteger('inversion_id');
            $table->foreign('inversion_id')->references('id')->on('inversiones')->onDelete('cascade');

            $table->unsignedBigInteger('producto_id');
            $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inversion_producto');
    }
};
