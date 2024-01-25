<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Comercio;

class ProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('proveedores')->insert([
            [
                'nombre' => 'SM Calle Mitre',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'direccion' => 'Calle mitre',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Gerardo',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'direccion' => 'sin direccion',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Día',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'direccion' => 'sin direccion',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Carrefourd',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'direccion' => 'sin direccion',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'El Rayo SRL',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'direccion' => 'Av. Eva Perón 9593, Loma Hermosa',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'JN Distribuidora',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'direccion' => '1657 Ruta 8 10084',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
