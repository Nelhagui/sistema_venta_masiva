<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    public function definition(): array
    {
        $titulo = fake()->name()." ".fake()->randomNumber(4);
        $codigo_barra = fake()->ean13;

        // Verificar la unicidad del nombre y el código de barras
        do {
            $tituloExistente = Producto::where('titulo', $titulo)->first();
            $codigoBarraExistente = Producto::where('codigo_barra', $codigo_barra)->first();

            if ($tituloExistente || $codigoBarraExistente) {
                // Generar nuevos valores si ya existen en la base de datos
                $titulo = fake()->name()." ".fake()->randomNumber(4);
                $codigo_barra = fake()->ean13;
            }
        } while ($tituloExistente || $codigoBarraExistente);
        return [
            'titulo' => $titulo,
            'descripcion' => fake()->words(30, true),
            'precio_costo' => fake()->randomFloat(2, 1, 1000),
            'precio_venta' => fake()->randomFloat(2, 1, 2000),
            'stock_actual' => fake()->numberBetween(0, 1000),
            'codigo_barra' => $codigo_barra,
            'usar_control_por_lote' => fake()->randomElement([true, false]),
            'habilitado' => fake()->randomElement([true, false]),
        ];
    }
}