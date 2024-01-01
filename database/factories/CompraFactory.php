<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Proveedor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Compra>
 */
class CompraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $proveedor = Proveedor::inRandomOrder()->first();

        return [
            'proveedor_id' => $proveedor->id,
            'precio_total' => fake()->randomFloat(2, 1, 1000),
            'fecha_compra' => fake()->dateTimeBetween('2024-01-01', '2024-01-31')->format('Y-m-d'),
            'fecha_carga' => fake()->dateTimeBetween('2024-01-01', '2024-01-31')->format('Y-m-d'),
            'numero_factura' => fake()->creditCardNumber,
        ];
    }
}
