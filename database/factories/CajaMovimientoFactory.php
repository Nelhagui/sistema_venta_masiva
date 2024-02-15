<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\SesionCaja;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CajaMovimiento>
 */
class CajaMovimientoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Elegir un tipo aleatoriamente
        $tipo = fake()->randomElement(['adicion', 'retiro']);
        // Generar monto según el tipo
        $monto = ($tipo === 'adicion') ? fake()->randomFloat(2, 0, 1000) : -fake()->randomFloat(2, 0, 1000);
        return [
            'sesion_caja_id' => function () {
                return SesionCaja::all()->random();
            },
            'user_id' => function () {
                return User::all()->random();
            },
            'tipo' => $tipo,
            'descripcion' => fake()->sentence,
            'monto' => $monto,
        ];
    }
}