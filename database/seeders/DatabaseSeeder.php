<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Comercio;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $comercio = Comercio::create([
            'nombre' => 'Kiosco La 41',
        ]);

        $comercio = Comercio::create([
            'nombre' => 'Kiosco La Fábrica',
        ]);

        $comercio = Comercio::create([
            'nombre' => 'Kiosco Coronado',
        ]);

        $user = User::create([
            'comercio_id' => $comercio->id,
            'nombre' => 'Juan Pérez',
            'email' => 'juanperez@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        $this->call([
            ProductsTableSeeder::class,
            // ProductosBaseSeeder::class,
            ClientesTableSeeder::class,
            ProveedorSeeder::class,
            MetodoPagoSeeder::class,
            // CompraSeeder::class,
        ]);
        
        // \App\Models\SesionCaja::factory()->count(100)->create();
        // \App\Models\CajaMovimiento::factory()->count(100)->create();
    }
}