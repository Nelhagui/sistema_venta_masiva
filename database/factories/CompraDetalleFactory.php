<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;
use App\Models\Compra;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompraDetalle>
 */
class CompraDetalleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $producto = Producto::inRandomOrder()->first();
        $compra = Compra::inRandomOrder()->first();
        return [
            'compra_id' => $compra->id,
            'producto_id' => $producto->id,
            'precio_unitario' => $this->faker->randomFloat(2, 1, 100), // Genera un número decimal aleatorio entre 1 y 100 con dos decimales
            'cantidad' => $cantidad = rand(1, 10),
            'precio_total' => $producto->precio_costo * $cantidad,
        ];
    }
}
