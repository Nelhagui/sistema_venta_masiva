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
        Schema::create('promociones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('producto_id');
            $table->string('nombre');
            $table->decimal('descuento_monto', 8, 2)->nullable();
            $table->decimal('descuento_porcentaje', 5, 2)->nullable();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->softDeletes();
            $table->timestamps();
            
            // Llave foránea
            $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promociones');
    }
};
