<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MetodoPagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('metodo_pagos')->insert([
            [
                'nombre' => 'Efectivo',
                'markup' => null,
                'tipo_markup' => 0,
                'estado' => 1,
                'editable' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Mercado Pago',
                'markup' => 10,
                'tipo_markup' => 1,
                'estado' => 1,
                'editable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Mercado Pago Transferencia',
                'markup' => null,
                'tipo_markup' => 0,
                'estado' => 1,
                'editable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cheque',
                'markup' => null,
                'tipo_markup' => 0,
                'estado' => 1,
                'editable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
