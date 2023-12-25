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
        Schema::create('lotes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('producto_id');
            $table->unsignedBigInteger('proveedor_id')->nullable();
            $table->unsignedBigInteger('inversor_id')->nullable();
            $table->string('numero_factura')->nullable();
            $table->decimal('precio_costo', 8, 2);
            $table->decimal('precio_venta', 8, 2);
            $table->date('fecha_compra');
            $table->decimal('precio_dolar', 8, 2)->nullable();
            $table->date('fecha_vencimiento')->nullable();
            $table->integer('cantidad_inicial');
            $table->integer('cantidad_restante');
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->foreign('proveedor_id')->references('id')->on('proveedores')->onDelete('cascade');
            $table->foreign('inversor_id')->references('id')->on('inversores')->onDelete('cascade');
            $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lotes');
    }
};
