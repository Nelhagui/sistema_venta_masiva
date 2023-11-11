<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockMovimiento>
 */
class StockMovimientoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'producto_id' => function () {
                return Producto::all()->random();
            },
            'descripcion' => fake()->sentence,
            'cantidad' => fake()->randomNumber(2),
        ];
    }
}
