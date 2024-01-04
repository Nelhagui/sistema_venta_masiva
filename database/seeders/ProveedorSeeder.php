<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
                'direccion' => 'Calle mitre',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Gerardo',
                'direccion' => 'sin direccion',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Día',
                'direccion' => 'sin direccion',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Carrefourd',
                'direccion' => 'sin direccion',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'El Rayo SRL',
                'direccion' => 'Av. Eva Perón 9593, Loma Hermosa',
                'telefono' => null,
                'whatsapp' => null,
                'nota' => 'Nota para Proveedor 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'JN Distribuidora',
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
