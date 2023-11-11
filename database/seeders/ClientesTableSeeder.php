<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;

class ClientesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clientes = [
            [
                'nombre' => "ARIEL ISCOT"
            ],
            [
                'nombre' => "CORI ISCOT"
            ],
            [
                'nombre' => "CRISTIAN BELTRAN D S"
            ],
            [
                'nombre' => "DIEGO ISCOT"
            ],
            [
                'nombre' => "DONATO ISCOT"
            ],
            [
                'nombre' => "GERMAN LABONIA"
            ],
            [
                'nombre' => "IVAN ISCOT"
            ],
            [
                'nombre' => "JORGE LABONIA"
            ],
            [
                'nombre' => "JORGE PINTOS ISCOT"
            ],
            [
                'nombre' => "JUAN ARCE ISCOT"
            ],
            [
                'nombre' => "LIMON ISCOT"
            ],
            [
                'nombre' => "MICAEL ISCOT"
            ],
            [
                'nombre' => "MONTIVERO ISCOT"
            ],
            [
                'nombre' => "NICO ISCOT"
            ],
            [
                'nombre' => "NICO PINTOS ISCOT"
            ],
            [
                'nombre' => "ROCIO"
            ],
            [
                'nombre' => "RODRIGO ISCOT"
            ],
            [
                'nombre' => "SEBASTIAN PSA"
            ],
            [
                'nombre' => "SERGIO CARDOZO"
            ]
        ];
        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }
    }
}