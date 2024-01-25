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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo')->unique();
            $table->text('descripcion')->nullable();
            $table->decimal('precio_costo', 15, 2)->nullable();
            $table->decimal('precio_venta', 15, 2)->nullable();
            $table->integer('stock_actual')->nullable();
            $table->string('codigo_barra')->unique()->nullable();
            $table->boolean('usar_control_por_lote')->default(false);
            $table->boolean('habilitado')->default(1);
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
        Schema::dropIfExists('productos');
    }
};
