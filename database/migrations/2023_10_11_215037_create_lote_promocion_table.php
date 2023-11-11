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
        Schema::create('lote_promocion', function (Blueprint $table) {
            $table->unsignedBigInteger('lote_id');
            $table->unsignedBigInteger('promocion_id');
            $table->timestamps();

            // Llave foránea
            $table->foreign('lote_id')->references('id')->on('lotes')->onDelete('cascade');
            $table->foreign('promocion_id')->references('id')->on('promociones')->onDelete('cascade');
            $table->primary(['lote_id', 'promocion_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lote_promocion');
    }
};
