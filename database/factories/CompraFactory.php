<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;
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

        $producto = Producto::factory()->create(); // Creando un nuevo producto para el detalle

        return [
            'producto_id' => $producto->id,
            'proveedor_id' => Proveedor::factory(),
            'precio_unitario' => $producto->precio_costo,
            'cantidad' => fake()->numberBetween(1, 10),
            'precio_total' => $this->precio_unitario * $this->cantidad,
            'fecha_compra' => fake()->date($format = 'Y-m-d', $max = 'fecha_carga'),
            'fecha_carga' => fake()->date($format = 'Y-m-d', $max = 'now'),
            'numero_factura' => fake()->creditCardNumber,
        ];
    }
}
