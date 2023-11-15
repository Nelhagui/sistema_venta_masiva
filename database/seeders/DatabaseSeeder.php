<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProductsTableSeeder::class,
            ProductosBaseSeeder::class,
            ClientesTableSeeder::class,
            ProveedorSeeder::class,
        ]);

        $user = User::create([
            'nombre' => 'Juan Pérez',
            'email' => 'juanperez@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // \App\Models\Producto::factory()->count(100)->create();
        \App\Models\SesionCaja::factory()->count(100)->create();
        \App\Models\CajaMovimiento::factory()->count(100)->create();
        // \App\Models\StockMovimiento::factory()->count(100)->create();
        // \App\Models\Venta::factory(10)->create(); // Crear 10 ventas para el ejemplo
        // \App\Models\DetalleVenta::factory(50)->create(); // Crear 50 detal

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}