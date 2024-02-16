<?php

namespace Database\Factories;

use App\Models\Comercio;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SesionCaja>
 */
class SesionCajaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => function () {
                return User::all()->random();
            },
            'comercio_id' => function () {
                return Comercio::all()->random();
            },
            'fecha_hora_apertura' => fake()->dateTimeThisMonth,
            'fecha_hora_cierre' => fake()->dateTimeThisMonth,
            'monto_inicial' => fake()->randomFloat(2, 0, 1000),
        ];
    }
}
