<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductosBase;
use Illuminate\Support\Facades\File;

class ProductosBaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $jsonPath = public_path('js/productos/products.json');
            $productos = json_decode(file_get_contents($jsonPath), true);

            foreach ($productos as $producto) {
                ProductosBase::create([
                    'codigo_barra' => $producto['codigo_barra'],
                    'titulo' => $producto['titulo'],
                    'rubro' => $producto['rubro'],
                    'subrubro' => $producto['subrubro'] ?? '', // Asume un valor por defecto si es nulo
                ]);
            }
        } catch (\Exception $e) {
            // Manejar el error aquí
            // Por ejemplo, imprimir el mensaje de error
            echo "Error al guardar los productos: " . $e->getMessage();
        }
    }
}
