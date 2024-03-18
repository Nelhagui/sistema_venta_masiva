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
        Schema::create('pago_inversiones', function (Blueprint $table) {
            $table->id();

            $table->decimal('monto_abonado', 10, 2);
            $table->date('fecha_pago');
            $table->text('nota')->nullable();
            $table->integer('metodo_pago_id')->default(0);
            $table->string('metodo_pago_titulo')->default('Efectivo');

            // Llave foránea
            $table->unsignedBigInteger('inversion_id');
            $table->foreign('inversion_id')->references('id')->on('inversiones')->onDelete('cascade');

            $table->unsignedBigInteger('usuario_carga_id');
            $table->foreign('usuario_carga_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('sesion_caja_id');
            $table->foreign('sesion_caja_id')->references('id')->on('sesiones_caja')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pago_inversiones');
    }
};
