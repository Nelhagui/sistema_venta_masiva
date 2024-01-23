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
            $table->unsignedBigInteger('user_id')->comment('quien realiza la venta'); // Quién realizó la venta
            $table->unsignedBigInteger('cliente_id')->nullable(); // Quién realizó la compra
            $table->enum('estado_pago', ['cobrada', 'parcialmente_cobrada', 'no_cobrada'])->default('cobrada');
            $table->decimal('monto_total_venta', 8, 2);
            $table->decimal('monto_total_costo', 8, 2);
            $table->date('fecha_venta');
            $table->string('metodos_de_pago');
            $table->decimal('markup', 8, 2)->nullable();
            $table->string('tipo_markup')->nullable(); 
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->foreign('sesion_caja_id')->references('id')->on('sesiones_caja')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
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
