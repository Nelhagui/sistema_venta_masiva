<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Comercio;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        $products = [
            [
                'titulo' => 'MARLBORO LS BOX 20 ',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '1114.53',
                'precio_venta' => '1350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MARLBORO ks sof 20 comun',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '991.83',
                'precio_venta' => '1200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS CAPS BLUE SPIN CONVERTIBLE BOX 20',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '991.83',
                'precio_venta' => '1200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHESTERFIELD REMIX PURPLE BOX 20',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '848.68',
                'precio_venta' => '1030',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS ks sof 20 comun',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '858.90',
                'precio_venta' => '1040',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MARLBORO RED BOX 12',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '654.40',
                'precio_venta' => '800',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS RED ORIGINAL BOX 12',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '572.60',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS CAPS BLUE SPIN CONVERTIBLE BOX 12',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '572.60',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHESTERFIELD RED KS BOX 10',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '439.68',
                'precio_venta' => '540',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHESTERFIELD BLUE MOTION BOX 12',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '490.80',
                'precio_venta' => '600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DOLCHESTER BOX X 20',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '354.00',
                'precio_venta' => '430',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'RED POINT KS COMUN X 20',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '385.10',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MASTER KS X 20',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '356.00',
                'precio_venta' => '440',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'RED POINT X 10 BOX',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '207.00',
                'precio_venta' => '260',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'RED POINT SUELTO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '0.00',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.POLVORITA x18g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '117.15',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE MINI x6u.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '385.69',
                'precio_venta' => '540',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE MINI x6u.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '385.69',
                'precio_venta' => '540',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.JORGITO x55g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '164.77',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.BON-O-BON x40g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '194.55',
                'precio_venta' => '280',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.OREO x56g.TRIPLE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '251.96',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.PEPITOS x57g.TRIPLE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '251.95',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.MILKA x55g.MOUSSE TRIPLE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '251.97',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE 3 x85g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '201.75',
                'precio_venta' => '290',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE 3 x85g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '201.75',
                'precio_venta' => '290',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.GUAYMALLEN x70g.CHOCOLATE TRIPLE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '118.78',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA BIZCOCHITO JORGITO x200g GRASA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '230.89',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MANA LIVIANA 136g.VAINILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '256.79',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VOCACION x141g.CLASICA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '177.54',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x140g.VAINILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '305.01',
                'precio_venta' => '430',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.SONRISAS x108g.FRAMBUESA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '247.63',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.LINCOLN x153g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '264.67',
                'precio_venta' => '380',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.OREO x118g.VAINILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '389.12',
                'precio_venta' => '550',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MERENGADAS x88g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '247.63',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VARIEDAD x390g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '561.13',
                'precio_venta' => '790',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VARIEDAD x300g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '481.19',
                'precio_venta' => '680',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.BAGLEY x398g.SURTIDO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '641.37',
                'precio_venta' => '900',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VARIEDAD x300g.DORADA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '490.26',
                'precio_venta' => '690',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x120g.MERENGUE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x160g.MOUSSE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x160g.VAINILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR CHIPPIS x120g. CHIPS DE CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x170g.MANTECADAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '238.64',
                'precio_venta' => '335',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x160g.FRUTILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CARAMELO ARCOR LECHE CREAM MILK',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '13.54',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CARAMELO ALKA MENTA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '4.55',
                'precio_venta' => '10',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX 800g.BANANA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '1481.32',
                'precio_venta' => '2225',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX 800g.FRUTALES',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '1481.32',
                'precio_venta' => '2225',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo ARCOR FRUTALES HALLOWEEN x396g',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '6.83',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bananita DOLCA 14g.x15u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '111.80',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.KINDER x24u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '80.30',
                'precio_venta' => '125',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tableta HAMLET x42g.BICOLOR',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '129.26',
                'precio_venta' => '195',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tableta HAMLET x45g.LECHE COOK',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '129.26',
                'precio_venta' => '195',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo SUGUS x50g.CONFITADO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '225.87',
                'precio_venta' => '340',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.PARAGUITAS x20u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '132.40',
                'precio_venta' => '200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.MARROC x20u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '137.23',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.f.ROCHER x3u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '334.77',
                'precio_venta' => '505',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.CABSHA x48u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '93.80',
                'precio_venta' => '145',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'FEELING x20g.DULCE de LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '146.47',
                'precio_venta' => '220',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MANTECOL x41g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '250.33',
                'precio_venta' => '380',
                'codigo_barra' =>  '7622201816414',
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MANTECOL x26g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '173.47',
                'precio_venta' => '265',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea TITA x19g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '121.44',
                'precio_venta' => '185',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea RHODESIA x22g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '133.40',
                'precio_venta' => '205',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Confites ROCKLETS x20g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '147.64',
                'precio_venta' => '225',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Encendedor CANDELA Clásico',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '151.06',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.VAQUITA x18u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '115.78',
                'precio_venta' => '175',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.MISKY x25g.BLANCO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '146.29',
                'precio_venta' => '220',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.ARCOR x25g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '81.55',
                'precio_venta' => '125',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.BLANCO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.COMBINADO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.ALMENDRA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 27g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '280.09',
                'precio_venta' => '425',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 27g.BLANCO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '280.09',
                'precio_venta' => '425',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER BLOCK x38g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '233.96',
                'precio_venta' => '355',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.AGUILA x14g.INDIVIDUAL',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '132.13',
                'precio_venta' => '200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bloque SHOT x35g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '188.22',
                'precio_venta' => '285',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea NUGATON x27g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '135.25',
                'precio_venta' => '205',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.FELFORT x20g.LECHE MANI',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '140.04',
                'precio_venta' => '215',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.TOFI x28g.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '277.18',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.GUAYMALLEN x40u.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '71.26',
                'precio_venta' => '110',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAPITO x24u.MANI',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '54.17',
                'precio_venta' => '85',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MANA 152g.VANILLA/FRUTI',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '315.92',
                'precio_venta' => '475',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BUBBALOO x60u.UVA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '20.66',
                'precio_venta' => '35',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'FLYNN PAFF x70u.TUTTI FRUTTI',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '21.52',
                'precio_venta' => '35',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tampones OB CURVOS MEDIO 8u',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '931.94',
                'precio_venta' => '1400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Jabon LUX x125g ORQUIDEA ROSAS FRANCESAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '234.07',
                'precio_venta' => '355',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Te TARAGUI x25s.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '230.26',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Past.TIC TAC u.MENTA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '103.49',
                'precio_venta' => '160',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Galletitas TODDY CON CHIPS DE CHOCOLATE x50g',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '168.16',
                'precio_venta' => '255',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Jabon LUX x125g LIRIO AZUL',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '234.07',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tampones OB CURVOS MINI 8u',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '591.55',
                'precio_venta' => '890',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MINI PEPITOS x50g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '147.26',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.OREO x50g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '161.13',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BELDENT un.MENTOL POSEIDON',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '119.99',
                'precio_venta' => '180',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BELDENT un.TUTTI GLOBO POSEIDON',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '119.99',
                'precio_venta' => '180',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MATE COCIDO x25s.UNION',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '341.34',
                'precio_venta' => '520',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'HALLS un.STRONG',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '150.36',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BELDENT un.MENTA POSEIDON',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '119.99',
                'precio_venta' => '180',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Halls un.Menta',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '150.36',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Edulcorante SI DIET x200ml.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '451.08',
                'precio_venta' => '680',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x21g.NUTRI',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x21g.FRUTILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x18g.FLEKOS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x23g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal CROCO x19g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo SUGUS x700g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '7.31',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chupetin MR.POP s x50u.FRUTAL',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '30.43',
                'precio_venta' => '50',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX x800g.FRUTILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '7.48',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo ARCOR CRISTAL MENTA x810g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '13.54',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo PALITOS DE LA SELVA x660g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '15.40',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX x800g.MENTOL',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '8.23',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX x800g.EUCALIPTO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '8.23',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR CHEDDAR',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR QUESO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR JAMON',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR PIZZA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo ARCOR BUTTER 822g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '13.55',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x170g.COQUITOS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x140g.SUAVECITAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MELBA x120g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '266.14',
                'precio_venta' => '400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.DUQUESA x115g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '236.16',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x140g. MOROCHITAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x170g.MARMOLADAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'toalla DONCELLA DELGADA CON CANALES S/DESDO, x8u',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '279.13',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'toalla DONCELLA DELGADA CON CANALES C/DESDO, x8u',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '279.13',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TOALLA CALIPSO S.ANATOMICA x8u',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '302.27',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Protec.CALIPSO COLA LESS x20u',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '399.18',
                'precio_venta' => '600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Madalena VALENTE CHIPS CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '408.06',
                'precio_venta' => '620',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Madalena VALENTE RELLENA DULCE de LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '408.06',
                'precio_venta' => '620',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA PASEO x300g MINI SALVADO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '371.34',
                'precio_venta' => '560',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA PASEO x300g MINI CRACKERS CLASICA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '307.52',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA CORONITAS x140g.FRUTOS DEL BOSQUE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA  PASEO x300g MINI 5 SEMILLAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '371.34',
                'precio_venta' => '560',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x500g.PEPAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '535.59',
                'precio_venta' => '800',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x140g.FRUTILLA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x 140g.CHOC.BLANCO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bizc.9 ORO x200g.AGRIDULCE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '234.99',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x140g.CHOCOLATE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TEREREPIN x200g.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '233.44',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x300g.TRICHOC',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '374.42',
                'precio_venta' => '570',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bizc.DON SATUR x200g.DULCE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '253.63',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cafe CABRALES SAQUITOS 18u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '75.69',
                'precio_venta' => '120',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Past.TIC TAC u.n. NARANJA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '103.49',
                'precio_venta' => '160',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BIZCOCHITOS 9 ORO 200gr CLASICOS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MEDIATARDE x315g',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '274.61',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bizc.DON SATUR x200g.SALADO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '253.63',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x200g.PEPAS',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '211.56',
                'precio_venta' => '320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x300g.CHOCOTRIO PEPA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '504.71',
                'precio_venta' => '760',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.BON-O-BON x18u.LECHE',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '108.15',
                'precio_venta' => '290',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAZOOKA x120u.TUTTI FRUTTI',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '18.22',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Mate COCIDO x50s.UNION',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '614.28',
                'precio_venta' => '930',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea Bon o Bon Blanca',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '190.46',
                'precio_venta' => '290',
                'codigo_barra' =>  '7790580346614',
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BUBBALOO x60u.MENTA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '20.66',
                'precio_venta' => '35',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.MILKA OREO x13u.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '102.15',
                'precio_venta' => '160',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.GUAYMALLEN x40u.BLANCO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '71.27',
                'precio_venta' => '110',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SEM.GIR PIPAS 18 gr.',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '77.90',
                'precio_venta' => '120',
                'codigo_barra' =>  '77965233',
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'APOSITO CURITA 8 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '109.90',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YERBA AMANDA SUAVE 500 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '819.90',
                'precio_venta' => '1230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'HUEVO KINDER ROSADO 20 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '339.90',
                'precio_venta' => '510',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BOLIGR. BIC OPACO NEGRO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '209.90',
                'precio_venta' => '320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BOLIGR. BIC OPACO AZUL',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '209.90',
                'precio_venta' => '320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ENCEND. BIC MINI J5LIS0',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '349.90',
                'precio_venta' => '530',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TE L.VIRGINIA BOLDO 25 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '409.90',
                'precio_venta' => '620',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL CREMA BAL. 10 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '24.90',
                'precio_venta' => '40',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'HUEVO KINDER CELESTE 20 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '339.90',
                'precio_venta' => '510',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CAFE L.VIRGINIA SAQUITO 20 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '944.91',
                'precio_venta' => '1420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO ESENCIAL BCO 6X30 mt SUELTO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '0.00',
                'precio_venta' => '260',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO ESENCIAL BCO 6X30 mt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '875.02',
                'precio_venta' => '1320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ENCEND. BIC MAXI J6LIS0',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAP.HIG ESENCIAL MAX 6X80 mt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '2039.93',
                'precio_venta' => '3060',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROL.COC SUSSEX CLASICO 3X50 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '629.89',
                'precio_venta' => '950',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YERBA L.CUMBREC 500 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '577.39',
                'precio_venta' => '870',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JABON TOCADOR PATRICIA ALLEN EQUILIBRIO 130G',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL CREMA BAL. 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL RECONS.INST 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL CREMA BAL 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAL CELUSAL FINA PAQ. 500 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '218.30',
                'precio_venta' => '330',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAL CELUSAL FINA EST 500 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '218.30',
                'precio_venta' => '330',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAL CELUSAL GRUESA PAQ 500 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '183.64',
                'precio_venta' => '280',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROL.COC MAROLIO ULTRA 2X100 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '713.89',
                'precio_venta' => '1080',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DESINF. LYSOFORM AIR.UL.MONT 380 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '818.90',
                'precio_venta' => '1230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LECHE MILKAUT CHOCOLATADA 200 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '250.95',
                'precio_venta' => '400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN FEDERAL ROP.DELIC 150 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '199.40',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN ESENCIAL COCO 200 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '346.39',
                'precio_venta' => '520',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PR.FEM. DONCELLA ANAT.S.DES 20 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '230.89',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LECHE CHOCOLATADA NESQUIK M.AZUC. 200 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '293.90',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN ALA COCO 200 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAV.ALA ULTRA LIMON 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN SEISEME 300 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '493.40',
                'precio_venta' => '750',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL CREMA BAL. 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE LIMON 360 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE FLOR.PERF 360 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AUTOBR. CERAMICAL NEGRO 800 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '808.39',
                'precio_venta' => '1220',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE LAVAND 360 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LECHE ANGELITA L.VIDA LIVI 1 lt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '379.90',
                'precio_venta' => '570',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YERBA UNION 4 FLEX 500 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '799.89',
                'precio_venta' => '1200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL CR.BALANCE 10 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '24.90',
                'precio_venta' => '40',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YER.SAQ UNION 25 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'EDULC. HILEREET SWEET FORTE 200 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '499.90',
                'precio_venta' => '750',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TE CRYSF 25 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '199.90',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CAFE L.VIRGINIA INST.SUAVE 50 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '519.90',
                'precio_venta' => '780',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'OBLEA RHODESIA 36 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '125.41',
                'precio_venta' => '190',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.TOC PAT.ALLEN GLIC.FLORAL 90 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE CARIC.ALG 360 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL RECONS INST 300 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TE L.VIRGINIA MANZANILLA 25 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PR.FEM. DONCELLA ANAT.S DES 20 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '230.89',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL CREMA BAL 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHOC. MISKY C.LECHE 30X25 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '147.00',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LIMP. PROCENEX LIMON 900 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DESINF. LYSOFORM AIR.MONT 380 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '818.90',
                'precio_venta' => '1230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAVAJ CF LIMON 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHUPET. PICO DULCE 24 un',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '54.68',
                'precio_venta' => '90',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE VAINILLA 360 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DETERG. MAGISTRAL LIMON MULTI 300 ml',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '535.39',
                'precio_venta' => '810',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LIMP. PROCENEX AIRES PRIM. 900 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '335.90',
                'precio_venta' => '510',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAND. AYUDIN ANTIPLASH 1 lt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '304.40',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAND. AYUDIN CLASICA 1 lt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAND. AYUDIN T.PODER GLA 1 lt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '293.90',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PVO ZORRO EVO QUIT 3 kg',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '1732.39',
                'precio_venta' => '2600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LIMP. PROCENEX BEBE 900 cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MANAOS COLA 2.25 L x36uni',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '318.33',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AGUA SMARTWATER 591cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '144.90',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AGUA MANAOS 600cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '97.50',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AGUA MANAOS 2L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '165.00',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PEPSI LATA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '200.00',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PEPSI 500cc botellita',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '269.90',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'COCA COLA 500cc botellita',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '330.00',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'COCA COLA 1L VIDRIO x12uni',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '545.83',
                'precio_venta' => '850',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAGGIO 200ml MULTIFRUTA',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '146.11',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SPEED CHICO x24uni',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '304.17',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GATORADE NARANJA 500cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '329.89',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'POWERADE M.BLAST 500cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '309.89',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LEVITE NARANJA 1L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '229.90',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GATORADE UVA  500cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '259.90',
                'precio_venta' => '400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GATORADE MANZANA 500cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '329.89',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAGGIO FRESH POMELO 1.5L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '499.90',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAGGIO FRESH NARANJA 1.5L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '499.90',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CERV BRAHMA AMARILLA 473cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '545.88',
                'precio_venta' => '850',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CERV BRAHMA DORADA 473cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '419.89',
                'precio_venta' => '650',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'POWERADE MANZANA 500cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '309.89',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CERV STELLA ART 473cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '549.90',
                'precio_venta' => '850',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO DURAZNO MANZANA 1L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO DURAZNO NARANJA 1L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO MIX FRUTAL 1L',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO MANZANA 1L ',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SEVEN UP 500cc',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '283.39',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AZUCAR LEDESMA 1KG',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '840.94',
                'precio_venta' => '1280',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHOCOLATE FELFORT 2 CORAZONES 26gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '249.90',
                'precio_venta' => '380',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO TANG LIMON DULCE 18gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '69.90',
                'precio_venta' => '100',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO TANG NARANJA 18gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '69.90',
                'precio_venta' => '100',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROLLO COCINA SUSSEX PREM 3X100',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '1049.89',
                'precio_venta' => '1500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROLLO COCINA SUSSEX PREM 3X100 SUELTO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '500.00',
                'precio_venta' => '600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO VUAL ECOL 6X30 mt',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '745.38',
                'precio_venta' => '1050',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO VUAL ECOL 6X30 mt SUELTO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '350.00',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS REX ORIGINAL 75 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '241.40',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GOMITAS PLENARIO DIENTITOS CADA UNO ',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '2414.89',
                'precio_venta' => '80',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BIZCOCHITO 9 DE ORO AZUCARADOS 210g',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TABLETA RAID MOSQUITO CADA UNO',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '32.81',
                'precio_venta' => '50',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MENTITAS DRF',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '0.00',
                'precio_venta' => '150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BIZCOCHITO 9 DE ORO SALVADO 210g',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CACAO TODDY EXTREMO 360gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '629.89',
                'precio_venta' => '950',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS HOJALMAR TRIANGULITO 250 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '734.89',
                'precio_venta' => '1100',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS HOJALMAR TRIANGULITO 150 gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '451.38',
                'precio_venta' => '690',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS SALADIX JAMON 100gr',
                'comercio_id' => Comercio::inRandomOrder()->first()->id,
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],

        ];

        foreach ($products as $product) {
            Producto::create($product);
        }
    }
}