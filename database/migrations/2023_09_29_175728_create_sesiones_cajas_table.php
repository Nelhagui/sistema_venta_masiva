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
        Schema::create('sesiones_caja', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Relación con la tabla de usuarios
            $table->unsignedBigInteger('comercio_id'); // Relación con la tabla de usuarios
            $table->timestamp('fecha_hora_apertura');
            $table->timestamp('fecha_hora_cierre')->nullable(); // Puede ser NULL si la caja aún no ha sido cerrada
            $table->decimal('monto_inicial', 8, 2);
            $table->decimal('monto_final', 8, 2)->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Llave foránea
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('comercio_id')->references('id')->on('comercios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesiones_cajas');
    }
};
