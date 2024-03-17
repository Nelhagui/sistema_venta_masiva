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
        Schema::create('caja_movimientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sesion_caja_id'); // Relación con la tabla sesiones_caja
            $table->unsignedBigInteger('user_id'); // Relación con la tabla de usuarios
            $table->unsignedBigInteger('metodo_id'); // Relación con la tabla de usuarios
            $table->string('metodo_pago');
            $table->enum('tipo', ['adicion','retiro']);
            $table->string('descripcion')->nullable();
            $table->decimal('monto', 8, 2);
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
        Schema::dropIfExists('caja_movimientos');
    }
};
