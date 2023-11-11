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
            $table->decimal('monto_total_venta', 8, 2);
            $table->decimal('monto_total_costo', 8, 2);
            $table->date('fecha_venta');
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->foreign('sesion_caja_id')->references('id')->on('sesiones_caja')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
