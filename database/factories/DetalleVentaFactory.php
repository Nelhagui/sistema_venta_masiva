<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;
use App\Models\Venta;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetalleVenta>
 */
class DetalleVentaFactory extends Factory
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
            'venta_id' => Venta::factory(),
            'producto_id' => $producto->id,
            'cantidad' => fake()->numberBetween(1, 10),  // Cantidad entre 1 y 10 para el ejemplo
            'precio_unitario' => $producto->precio_venta, 
            'costo_unitario' => $producto->precio_costo 
        ];
    }
}
