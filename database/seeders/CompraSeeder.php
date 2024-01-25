<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Comercio;

class CompraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // COMPRA DIA
        $nombreProveedor = 'Día';
        $proveedor = DB::table('proveedores')->where('nombre', $nombreProveedor)->first();
        $compraId = DB::table('compras')->insertGetId([
            'comercio_id' => Comercio::inRandomOrder()->first()->id,
            'proveedor_id' => $proveedor->id, // Aquí deberías establecer el ID del proveedor o su nombre, dependiendo de cómo lo manejes en tu aplicación
            'precio_total' => 3770, // Precio total de la compra
            'fecha_compra' => Carbon::parse('2023-12-01'),
            'fecha_carga' => Carbon::parse('2024-01-01'),
            'numero_factura' => '10421-00003658', // Número de factura
        ]);
        $detalleCompra = [
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Pepsi Lata'),
                'precio_unitario' => 233.00,
                'cantidad' => 6,
                'precio_total' => 1398.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Seven Up Lata'),
                'precio_unitario' => 229.00,
                'cantidad' => 6,
                'precio_total' => 1374.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Chocolate Con Leche'),
                'precio_unitario' => 249.00,
                'cantidad' => 1,
                'precio_total' => 249.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Chocolate Blanco'),
                'precio_unitario' => 249.00,
                'cantidad' => 1,
                'precio_total' => 249.00,
            ],
        ];
        DB::table('compra_detalles')->insert($detalleCompra);
        // FIN COMPRA DIA

        // COMPRA JN DISTRIBUIDORA
        $nombreProveedor = 'JN Distribuidora';
        $proveedor = DB::table('proveedores')->where('nombre', $nombreProveedor)->first();
        $compraId = DB::table('compras')->insertGetId([
            'comercio_id' => Comercio::inRandomOrder()->first()->id,
            'proveedor_id' => $proveedor->id, // Aquí deberías establecer el ID del proveedor o su nombre, dependiendo de cómo lo manejes en tu aplicación
            'precio_total' => 9730.00, // Precio total de la compra
            'fecha_compra' => Carbon::parse('2023-12-19'),
            'fecha_carga' => Carbon::parse('2024-01-01'),
            'numero_factura' => '00036647', // Número de factura
        ]);
        $detalleCompra = [
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Agua Manaos 2L'),
                'precio_unitario' => 383.33,
                'cantidad' => 6,
                'precio_total' => 2300.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Agua Manaos 600cc Sin Gas'),
                'precio_unitario' => 265.00,
                'cantidad' => 12,
                'precio_total' => 3180,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Manaos Naranja 2.25L'),
                'precio_unitario' => 708.33,
                'cantidad' => 6,
                'precio_total' => 4250.00,
            ],
        ];
        DB::table('compra_detalles')->insert($detalleCompra);
        // FIN COMPRA JN DISTRIBUIDORA

        // COMPRA El RAYO SRL
        $nombreProveedor = 'El Rayo SRL';
        $proveedor = DB::table('proveedores')->where('nombre', $nombreProveedor)->first();
        $compraId = DB::table('compras')->insertGetId([
            'comercio_id' => Comercio::inRandomOrder()->first()->id,
            'proveedor_id' => $proveedor->id, // Aquí deberías establecer el ID del proveedor o su nombre, dependiendo de cómo lo manejes en tu aplicación
            'precio_total' => 3807.00, // Precio total de la compra
            'fecha_compra' => Carbon::parse('2023-11-30'),
            'fecha_carga' => Carbon::parse('2024-01-01'),
            'numero_factura' => '0001-00809721', // Número de factura
        ]);
        $detalleCompra = [
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Salchica Viene Larga Unión x12'),
                'precio_unitario' => 2172.00,
                'cantidad' => 1,
                'precio_total' => 2172.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Pan Super Pancho Chipis'),
                'precio_unitario' => 545.00,
                'cantidad' => 3,
                'precio_total' => 1635.00,
            ],
        ];
        DB::table('compra_detalles')->insert($detalleCompra);
        // FIN COMPRA EL RAYO SRL

        // COMPRA El RAYO SRL
        $nombreProveedor = 'El Rayo SRL';
        $proveedor = DB::table('proveedores')->where('nombre', $nombreProveedor)->first();
        $compraId = DB::table('compras')->insertGetId([
            'comercio_id' => Comercio::inRandomOrder()->first()->id,
            'proveedor_id' => $proveedor->id, // Aquí deberías establecer el ID del proveedor o su nombre, dependiendo de cómo lo manejes en tu aplicación
            'precio_total' => 2598.00, // Precio total de la compra
            'fecha_compra' => Carbon::parse('2023-11-29'),
            'fecha_carga' => Carbon::parse('2024-01-01'),
            'numero_factura' => '0001-00809308', // Número de factura
        ]);
        $detalleCompra = [
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Salchica Viene Larga Unión x12'),
                'precio_unitario' => 2172.00,
                'cantidad' => 1,
                'precio_total' => 2172.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Pan Super Pancho Branca'),
                'precio_unitario' => 426.00,
                'cantidad' => 1,
                'precio_total' => 426.00,
            ],
        ];
        DB::table('compra_detalles')->insert($detalleCompra);
        // FIN COMPRA EL RAYO SRL

        // COMPRA El RAYO SRL
        $nombreProveedor = 'El Rayo SRL';
        $proveedor = DB::table('proveedores')->where('nombre', $nombreProveedor)->first();
        $compraId = DB::table('compras')->insertGetId([
            'comercio_id' => Comercio::inRandomOrder()->first()->id,
            'proveedor_id' => $proveedor->id, // Aquí deberías establecer el ID del proveedor o su nombre, dependiendo de cómo lo manejes en tu aplicación
            'precio_total' => 5872.00, // Precio total de la compra
            'fecha_compra' => Carbon::parse('2023-11-15'),
            'fecha_carga' => Carbon::parse('2024-01-01'),
            'numero_factura' => '0001-00806032', // Número de factura
        ]);
        $detalleCompra = [
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Galletitas Larguitas Hojalmar 150gr'),
                'precio_unitario' => 354.00,
                'cantidad' => 2,
                'precio_total' => 708.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Arroz Inflado Burbuja 80gr'),
                'precio_unitario' => 218.00,
                'cantidad' => 3,
                'precio_total' => 654.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Pan Super Pancho Chipis'),
                'precio_unitario' => 474.00,
                'cantidad' => 2,
                'precio_total' => 948.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Salchica Viene Larga Unión x12'),
                'precio_unitario' => 1993.00,
                'cantidad' => 1,
                'precio_total' => 1993.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Bastón Extra Queso 60gr'),
                'precio_unitario' => 302.50,
                'cantidad' => 2,
                'precio_total' => 605.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Galletitas Triang Hojalmar 150gr'),
                'precio_unitario' => 354.00,
                'cantidad' => 1,
                'precio_total' => 354.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Galletitas Celosas 110gr'),
                'precio_unitario' => 190.00,
                'cantidad' => 3,
                'precio_total' => 570.00,
            ],
        ];
        DB::table('compra_detalles')->insert($detalleCompra);
        // FIN COMPRA EL RAYO SRL

        // COMPRA El RAYO SRL
        $nombreProveedor = 'El Rayo SRL';
        $proveedor = DB::table('proveedores')->where('nombre', $nombreProveedor)->first();
        $compraId = DB::table('compras')->insertGetId([
            'comercio_id' => Comercio::inRandomOrder()->first()->id,
            'proveedor_id' => $proveedor->id, // Aquí deberías establecer el ID del proveedor o su nombre, dependiendo de cómo lo manejes en tu aplicación
            'precio_total' => 5872.00, // Precio total de la compra
            'fecha_compra' => Carbon::parse('2023-11-13'),
            'fecha_carga' => Carbon::parse('2024-01-01'),
            'numero_factura' => '0001-00806032', // Número de factura
        ]);
        $detalleCompra = [
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Arroz Inflado Burbuja 80gr'),
                'precio_unitario' => 218.00,
                'cantidad' => 4,
                'precio_total' => 872.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Pan Super Pancho Chipis'),
                'precio_unitario' => 474.00,
                'cantidad' => 1,
                'precio_total' => 474.00,
            ],
            [
                'compra_id' => $compraId,
                'producto_id' => $this->obtenerProductoIdPorNombre('Salchica Viene Larga Unión x12'),
                'precio_unitario' => 1993.00,
                'cantidad' => 1,
                'precio_total' => 1993.00,
            ]
        ];
        DB::table('compra_detalles')->insert($detalleCompra);
        // FIN COMPRA EL RAYO SRL
    }

    private function obtenerProductoIdPorNombre($nombreProducto)
    {
        // Buscar el producto por nombre
        $producto = DB::table('productos')->where('titulo', $nombreProducto)->first();

        // Si no se encuentra el producto, crearlo
        if (!$producto) {
            $nuevoProducto = [
                'titulo' => $nombreProducto,
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'descripcion' => 'Descripción por defecto', // Puedes cambiar esto según tus necesidades
                'precio_costo' => 0.00, // Puedes cambiar esto según tus necesidades
                'precio_venta' => 0.00, // Puedes cambiar esto según tus necesidades
                'stock_actual' => 0, // Puedes cambiar esto según tus necesidades
                'codigo_barra' => null, // Puedes cambiar esto según tus necesidades
                'usar_control_por_lote' => false, // Puedes cambiar esto según tus necesidades
                'habilitado' => true, // Puedes cambiar esto según tus necesidades
            ];

            $productoId = DB::table('productos')->insertGetId($nuevoProducto);
        } else {
            // Si el producto existe, obtener su ID
            $productoId = $producto->id;
        }

        return $productoId;
    }

    // Función para obtener el ID del producto por código de barras
    private function obtenerProductoIdPorCodigoDeBarras($codigoDeBarras)
    {
        return DB::table('productos')->where('codigo_de_barras', $codigoDeBarras)->value('id');
    }
}
