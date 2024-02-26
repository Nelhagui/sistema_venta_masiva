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
        Schema::create('inversiones', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inversion')->nullable();
            $table->decimal('monto_invertido', 10, 2);

            // Llave foránea
            $table->unsignedBigInteger('inversor_id');
            $table->foreign('inversor_id')->references('id')->on('inversores')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inversiones');
    }
};