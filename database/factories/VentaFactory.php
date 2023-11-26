<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\SesionCaja;
use App\Models\Producto;
use App\Models\Lote;
use Carbon\Carbon;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venta>
 */
class VentaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $metodoPago = MetodoPago::inRandomOrder()->first();

        return [
            'sesion_caja_id' => SesionCaja::factory(),
            'user_id' => User::factory(),
            'producto_id' => function () {
                return Producto::all()->random();
            },
            'lote_id' => fake()->randomElement(Lote::pluck('id')->push(null)->toArray()),
            'cantidad' => fake()->numberBetween(1, 100),
            'fecha_venta' => fake()->date(),
            'monto_total' => $this->faker->randomFloat(2, 10, 1000),
            'metodos_de_pago' => fake()->string(),
            'markup' => $faker->randomFloat(2, 0, 10),
            'tipo_markup' => $metodoPago->tipo_markup, // Puedes generar un valor aleatorio o usar el del método de pago
            'created_at' => $this->faker->dateTimeBetween(Carbon::now()->subDays(30), Carbon::now()),
        ];
    }
}
