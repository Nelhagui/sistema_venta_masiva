<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

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
                'precio_costo' => '1114.53',
                'precio_venta' => '1350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MARLBORO ks sof 20 comun',
                'precio_costo' => '991.83',
                'precio_venta' => '1200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS CAPS BLUE SPIN CONVERTIBLE BOX 20',
                'precio_costo' => '991.83',
                'precio_venta' => '1200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHESTERFIELD REMIX PURPLE BOX 20',
                'precio_costo' => '848.68',
                'precio_venta' => '1030',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS ks sof 20 comun',
                'precio_costo' => '858.90',
                'precio_venta' => '1040',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MARLBORO RED BOX 12',
                'precio_costo' => '654.40',
                'precio_venta' => '800',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS RED ORIGINAL BOX 12',
                'precio_costo' => '572.60',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PHILIP MORRIS CAPS BLUE SPIN CONVERTIBLE BOX 12',
                'precio_costo' => '572.60',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHESTERFIELD RED KS BOX 10',
                'precio_costo' => '439.68',
                'precio_venta' => '540',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHESTERFIELD BLUE MOTION BOX 12',
                'precio_costo' => '490.80',
                'precio_venta' => '600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DOLCHESTER BOX X 20',
                'precio_costo' => '354.00',
                'precio_venta' => '430',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'RED POINT KS COMUN X 20',
                'precio_costo' => '385.10',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MASTER KS X 20',
                'precio_costo' => '356.00',
                'precio_venta' => '440',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'RED POINT X 10 BOX',
                'precio_costo' => '207.00',
                'precio_venta' => '260',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'RED POINT SUELTO',
                'precio_costo' => '0.00',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.POLVORITA x18g.CHOCOLATE',
                'precio_costo' => '117.15',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE MINI x6u.LECHE',
                'precio_costo' => '385.69',
                'precio_venta' => '540',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE MINI x6u.CHOCOLATE',
                'precio_costo' => '385.69',
                'precio_venta' => '540',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.JORGITO x55g.CHOCOLATE',
                'precio_costo' => '164.77',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.BON-O-BON x40g.LECHE',
                'precio_costo' => '194.55',
                'precio_venta' => '280',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.OREO x56g.TRIPLE',
                'precio_costo' => '251.96',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.PEPITOS x57g.TRIPLE',
                'precio_costo' => '251.95',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.MILKA x55g.MOUSSE TRIPLE',
                'precio_costo' => '251.97',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE 3 x85g.LECHE',
                'precio_costo' => '201.75',
                'precio_venta' => '290',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.FANTOCHE 3 x85g.CHOCOLATE',
                'precio_costo' => '201.75',
                'precio_venta' => '290',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.GUAYMALLEN x70g.CHOCOLATE TRIPLE',
                'precio_costo' => '118.78',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA BIZCOCHITO JORGITO x200g GRASA',
                'precio_costo' => '230.89',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MANA LIVIANA 136g.VAINILLA',
                'precio_costo' => '256.79',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VOCACION x141g.CLASICA',
                'precio_costo' => '177.54',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x140g.VAINILLA',
                'precio_costo' => '305.01',
                'precio_venta' => '430',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.SONRISAS x108g.FRAMBUESA',
                'precio_costo' => '247.63',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.LINCOLN x153g.',
                'precio_costo' => '264.67',
                'precio_venta' => '380',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.OREO x118g.VAINILLA',
                'precio_costo' => '389.12',
                'precio_venta' => '550',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MERENGADAS x88g.',
                'precio_costo' => '247.63',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VARIEDAD x390g.',
                'precio_costo' => '561.13',
                'precio_venta' => '790',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VARIEDAD x300g.CHOCOLATE',
                'precio_costo' => '481.19',
                'precio_venta' => '680',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.BAGLEY x398g.SURTIDO',
                'precio_costo' => '641.37',
                'precio_venta' => '900',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.VARIEDAD x300g.DORADA',
                'precio_costo' => '490.26',
                'precio_venta' => '690',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x120g.MERENGUE',
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x160g.MOUSSE',
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x160g.VAINILLA',
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR CHIPPIS x120g. CHIPS DE CHOCOLATE',
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x170g.MANTECADAS',
                'precio_costo' => '238.64',
                'precio_venta' => '335',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PITUSAS x160g.FRUTILLA',
                'precio_costo' => '277.76',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CARAMELO ARCOR LECHE CREAM MILK',
                'precio_costo' => '13.54',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CARAMELO ALKA MENTA',
                'precio_costo' => '4.55',
                'precio_venta' => '10',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX 800g.BANANA',
                'precio_costo' => '1481.32',
                'precio_venta' => '2225',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX 800g.FRUTALES',
                'precio_costo' => '1481.32',
                'precio_venta' => '2225',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo ARCOR FRUTALES HALLOWEEN x396g',
                'precio_costo' => '6.83',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bananita DOLCA 14g.x15u.',
                'precio_costo' => '111.80',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.KINDER x24u.',
                'precio_costo' => '80.30',
                'precio_venta' => '125',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tableta HAMLET x42g.BICOLOR',
                'precio_costo' => '129.26',
                'precio_venta' => '195',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tableta HAMLET x45g.LECHE COOK',
                'precio_costo' => '129.26',
                'precio_venta' => '195',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo SUGUS x50g.CONFITADO',
                'precio_costo' => '225.87',
                'precio_venta' => '340',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.PARAGUITAS x20u.',
                'precio_costo' => '132.40',
                'precio_venta' => '200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.MARROC x20u.',
                'precio_costo' => '137.23',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.f.ROCHER x3u.',
                'precio_costo' => '334.77',
                'precio_venta' => '505',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.CABSHA x48u.',
                'precio_costo' => '93.80',
                'precio_venta' => '145',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'FEELING x20g.DULCE de LECHE',
                'precio_costo' => '146.47',
                'precio_venta' => '220',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MANTECOL x41g.',
                'precio_costo' => '250.33',
                'precio_venta' => '380',
                'codigo_barra' =>  '7622201816414',
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MANTECOL x26g.',
                'precio_costo' => '173.47',
                'precio_venta' => '265',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea TITA x19g.',
                'precio_costo' => '121.44',
                'precio_venta' => '185',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea RHODESIA x22g.',
                'precio_costo' => '133.40',
                'precio_venta' => '205',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Confites ROCKLETS x20g.CHOCOLATE',
                'precio_costo' => '147.64',
                'precio_venta' => '225',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Encendedor CANDELA Clásico',
                'precio_costo' => '151.06',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.VAQUITA x18u.',
                'precio_costo' => '115.78',
                'precio_venta' => '175',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.MISKY x25g.BLANCO',
                'precio_costo' => '146.29',
                'precio_venta' => '220',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.ARCOR x25g.LECHE',
                'precio_costo' => '81.55',
                'precio_venta' => '125',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.BLANCO',
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.COMBINADO',
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.LECHE',
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 55g.ALMENDRA',
                'precio_costo' => '492.71',
                'precio_venta' => '740',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 27g.LECHE',
                'precio_costo' => '280.09',
                'precio_venta' => '425',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER AIREADO 27g.BLANCO',
                'precio_costo' => '280.09',
                'precio_venta' => '425',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.COFLER BLOCK x38g.',
                'precio_costo' => '233.96',
                'precio_venta' => '355',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.AGUILA x14g.INDIVIDUAL',
                'precio_costo' => '132.13',
                'precio_venta' => '200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bloque SHOT x35g.',
                'precio_costo' => '188.22',
                'precio_venta' => '285',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea NUGATON x27g.LECHE',
                'precio_costo' => '135.25',
                'precio_venta' => '205',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.FELFORT x20g.LECHE MANI',
                'precio_costo' => '140.04',
                'precio_venta' => '215',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Choc.TOFI x28g.LECHE',
                'precio_costo' => '277.18',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.GUAYMALLEN x40u.CHOCOLATE',
                'precio_costo' => '71.26',
                'precio_venta' => '110',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAPITO x24u.MANI',
                'precio_costo' => '54.17',
                'precio_venta' => '85',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MANA 152g.VANILLA/FRUTI',
                'precio_costo' => '315.92',
                'precio_venta' => '475',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BUBBALOO x60u.UVA',
                'precio_costo' => '20.66',
                'precio_venta' => '35',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'FLYNN PAFF x70u.TUTTI FRUTTI',
                'precio_costo' => '21.52',
                'precio_venta' => '35',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tampones OB CURVOS MEDIO 8u',
                'precio_costo' => '931.94',
                'precio_venta' => '1400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Jabon LUX x125g ORQUIDEA ROSAS FRANCESAS',
                'precio_costo' => '234.07',
                'precio_venta' => '355',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Te TARAGUI x25s.',
                'precio_costo' => '230.26',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Past.TIC TAC u.MENTA',
                'precio_costo' => '103.49',
                'precio_venta' => '160',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Galletitas TODDY CON CHIPS DE CHOCOLATE x50g',
                'precio_costo' => '168.16',
                'precio_venta' => '255',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Jabon LUX x125g LIRIO AZUL',
                'precio_costo' => '234.07',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Tampones OB CURVOS MINI 8u',
                'precio_costo' => '591.55',
                'precio_venta' => '890',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MINI PEPITOS x50g.',
                'precio_costo' => '147.26',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.OREO x50g.',
                'precio_costo' => '161.13',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BELDENT un.MENTOL POSEIDON',
                'precio_costo' => '119.99',
                'precio_venta' => '180',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BELDENT un.TUTTI GLOBO POSEIDON',
                'precio_costo' => '119.99',
                'precio_venta' => '180',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MATE COCIDO x25s.UNION',
                'precio_costo' => '341.34',
                'precio_venta' => '520',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'HALLS un.STRONG',
                'precio_costo' => '150.36',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BELDENT un.MENTA POSEIDON',
                'precio_costo' => '119.99',
                'precio_venta' => '180',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Halls un.Menta',
                'precio_costo' => '150.36',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Edulcorante SI DIET x200ml.',
                'precio_costo' => '451.08',
                'precio_venta' => '680',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x21g.NUTRI',
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x21g.FRUTILLA',
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x18g.FLEKOS',
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal FORT x23g.',
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cereal CROCO x19g.',
                'precio_costo' => '137.89',
                'precio_venta' => '210',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo SUGUS x700g.',
                'precio_costo' => '7.31',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chupetin MR.POP s x50u.FRUTAL',
                'precio_costo' => '30.43',
                'precio_venta' => '50',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX x800g.FRUTILLA',
                'precio_costo' => '7.48',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo ARCOR CRISTAL MENTA x810g.',
                'precio_costo' => '13.54',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo PALITOS DE LA SELVA x660g.',
                'precio_costo' => '15.40',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX x800g.MENTOL',
                'precio_costo' => '8.23',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Goma GOLOMIX x800g.EUCALIPTO',
                'precio_costo' => '8.23',
                'precio_venta' => '20',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR CHEDDAR',
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR QUESO',
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR JAMON',
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Talitas URQUIZA x100g SABOR PIZZA',
                'precio_costo' => '255.58',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Caramelo ARCOR BUTTER 822g.CHOCOLATE',
                'precio_costo' => '13.55',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x170g.COQUITOS',
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x140g.SUAVECITAS',
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MELBA x120g.',
                'precio_costo' => '266.14',
                'precio_venta' => '400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.DUQUESA x115g.',
                'precio_costo' => '236.16',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x140g. MOROCHITAS',
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.PARNOR x170g.MARMOLADAS',
                'precio_costo' => '238.64',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'toalla DONCELLA DELGADA CON CANALES S/DESDO, x8u',
                'precio_costo' => '279.13',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'toalla DONCELLA DELGADA CON CANALES C/DESDO, x8u',
                'precio_costo' => '279.13',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TOALLA CALIPSO S.ANATOMICA x8u',
                'precio_costo' => '302.27',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Protec.CALIPSO COLA LESS x20u',
                'precio_costo' => '399.18',
                'precio_venta' => '600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Madalena VALENTE CHIPS CHOCOLATE',
                'precio_costo' => '408.06',
                'precio_venta' => '620',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Madalena VALENTE RELLENA DULCE de LECHE',
                'precio_costo' => '408.06',
                'precio_venta' => '620',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA PASEO x300g MINI SALVADO',
                'precio_costo' => '371.34',
                'precio_venta' => '560',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA PASEO x300g MINI CRACKERS CLASICA',
                'precio_costo' => '307.52',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA CORONITAS x140g.FRUTOS DEL BOSQUE',
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITA  PASEO x300g MINI 5 SEMILLAS',
                'precio_costo' => '371.34',
                'precio_venta' => '560',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x500g.PEPAS',
                'precio_costo' => '535.59',
                'precio_venta' => '800',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x140g.FRUTILLA',
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x 140g.CHOC.BLANCO',
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bizc.9 ORO x200g.AGRIDULCE',
                'precio_costo' => '234.99',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.CORONITAS x140g.CHOCOLATE',
                'precio_costo' => '305.01',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TEREREPIN x200g.',
                'precio_costo' => '233.44',
                'precio_venta' => '360',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x300g.TRICHOC',
                'precio_costo' => '374.42',
                'precio_venta' => '570',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bizc.DON SATUR x200g.DULCE',
                'precio_costo' => '253.63',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Cafe CABRALES SAQUITOS 18u.',
                'precio_costo' => '75.69',
                'precio_venta' => '120',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Past.TIC TAC u.n. NARANJA',
                'precio_costo' => '103.49',
                'precio_venta' => '160',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BIZCOCHITOS 9 ORO 200gr CLASICOS',
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.MEDIATARDE x315g',
                'precio_costo' => '274.61',
                'precio_venta' => '420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Bizc.DON SATUR x200g.SALADO',
                'precio_costo' => '253.63',
                'precio_venta' => '390',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x200g.PEPAS',
                'precio_costo' => '211.56',
                'precio_venta' => '320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Gall.TRIO x300g.CHOCOTRIO PEPA',
                'precio_costo' => '504.71',
                'precio_venta' => '760',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.BON-O-BON x18u.LECHE',
                'precio_costo' => '108.15',
                'precio_venta' => '290',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAZOOKA x120u.TUTTI FRUTTI',
                'precio_costo' => '18.22',
                'precio_venta' => '30',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Mate COCIDO x50s.UNION',
                'precio_costo' => '614.28',
                'precio_venta' => '930',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Oblea Bon o Bon Blanca',
                'precio_costo' => '190.46',
                'precio_venta' => '290',
                'codigo_barra' =>  '7790580346614',
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Chicle BUBBALOO x60u.MENTA',
                'precio_costo' => '20.66',
                'precio_venta' => '35',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'b.MILKA OREO x13u.',
                'precio_costo' => '102.15',
                'precio_venta' => '160',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'Alf.GUAYMALLEN x40u.BLANCO',
                'precio_costo' => '71.27',
                'precio_venta' => '110',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SEM.GIR PIPAS 18 gr.',
                'precio_costo' => '77.90',
                'precio_venta' => '120',
                'codigo_barra' =>  '77965233',
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'APOSITO CURITA 8 un',
                'precio_costo' => '109.90',
                'precio_venta' => '170',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YERBA AMANDA SUAVE 500 gr',
                'precio_costo' => '819.90',
                'precio_venta' => '1230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'HUEVO KINDER ROSADO 20 gr',
                'precio_costo' => '339.90',
                'precio_venta' => '510',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BOLIGR. BIC OPACO NEGRO',
                'precio_costo' => '209.90',
                'precio_venta' => '320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BOLIGR. BIC OPACO AZUL',
                'precio_costo' => '209.90',
                'precio_venta' => '320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ENCEND. BIC MINI J5LIS0',
                'precio_costo' => '349.90',
                'precio_venta' => '530',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TE L.VIRGINIA BOLDO 25 un',
                'precio_costo' => '409.90',
                'precio_venta' => '620',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL CREMA BAL. 10 ml',
                'precio_costo' => '24.90',
                'precio_venta' => '40',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'HUEVO KINDER CELESTE 20 gr',
                'precio_costo' => '339.90',
                'precio_venta' => '510',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CAFE L.VIRGINIA SAQUITO 20 un',
                'precio_costo' => '944.91',
                'precio_venta' => '1420',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO ESENCIAL BCO 6X30 mt SUELTO',
                'precio_costo' => '0.00',
                'precio_venta' => '260',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO ESENCIAL BCO 6X30 mt',
                'precio_costo' => '875.02',
                'precio_venta' => '1320',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ENCEND. BIC MAXI J6LIS0',
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAP.HIG ESENCIAL MAX 6X80 mt',
                'precio_costo' => '2039.93',
                'precio_venta' => '3060',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROL.COC SUSSEX CLASICO 3X50 un',
                'precio_costo' => '629.89',
                'precio_venta' => '950',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YERBA L.CUMBREC 500 gr',
                'precio_costo' => '577.39',
                'precio_venta' => '870',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JABON TOCADOR PATRICIA ALLEN EQUILIBRIO 130G',
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL CREMA BAL. 300 ml',
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL RECONS.INST 300 ml',
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL CREMA BAL 300 ml',
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAL CELUSAL FINA PAQ. 500 gr',
                'precio_costo' => '218.30',
                'precio_venta' => '330',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAL CELUSAL FINA EST 500 gr',
                'precio_costo' => '218.30',
                'precio_venta' => '330',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SAL CELUSAL GRUESA PAQ 500 gr',
                'precio_costo' => '183.64',
                'precio_venta' => '280',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROL.COC MAROLIO ULTRA 2X100 un',
                'precio_costo' => '713.89',
                'precio_venta' => '1080',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DESINF. LYSOFORM AIR.UL.MONT 380 cc',
                'precio_costo' => '818.90',
                'precio_venta' => '1230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LECHE MILKAUT CHOCOLATADA 200 cc',
                'precio_costo' => '250.95',
                'precio_venta' => '400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN FEDERAL ROP.DELIC 150 gr',
                'precio_costo' => '199.40',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN ESENCIAL COCO 200 gr',
                'precio_costo' => '346.39',
                'precio_venta' => '520',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PR.FEM. DONCELLA ANAT.S.DES 20 un',
                'precio_costo' => '230.89',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LECHE CHOCOLATADA NESQUIK M.AZUC. 200 ml',
                'precio_costo' => '293.90',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN ALA COCO 200 gr',
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAV.ALA ULTRA LIMON 300 ml',
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PAN SEISEME 300 gr',
                'precio_costo' => '493.40',
                'precio_venta' => '750',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL CREMA BAL. 300 ml',
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE LIMON 360 cc',
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE FLOR.PERF 360 cc',
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AUTOBR. CERAMICAL NEGRO 800 ml',
                'precio_costo' => '808.39',
                'precio_venta' => '1220',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE LAVAND 360 cc',
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LECHE ANGELITA L.VIDA LIVI 1 lt',
                'precio_costo' => '379.90',
                'precio_venta' => '570',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YERBA UNION 4 FLEX 500 gr',
                'precio_costo' => '799.89',
                'precio_venta' => '1200',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL CR.BALANCE 10 ml',
                'precio_costo' => '24.90',
                'precio_venta' => '40',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'YER.SAQ UNION 25 un',
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'EDULC. HILEREET SWEET FORTE 200 cc',
                'precio_costo' => '499.90',
                'precio_venta' => '750',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TE CRYSF 25 un',
                'precio_costo' => '199.90',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CAFE L.VIRGINIA INST.SUAVE 50 gr',
                'precio_costo' => '519.90',
                'precio_venta' => '780',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'OBLEA RHODESIA 36 un',
                'precio_costo' => '125.41',
                'precio_venta' => '190',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.TOC PAT.ALLEN GLIC.FLORAL 90 gr',
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE CARIC.ALG 360 cc',
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ACOND. SEDAL RECONS INST 300 cc',
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TE L.VIRGINIA MANZANILLA 25 un',
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PR.FEM. DONCELLA ANAT.S DES 20 un',
                'precio_costo' => '230.89',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SHAMP. SEDAL CREMA BAL 300 ml',
                'precio_costo' => '419.89',
                'precio_venta' => '630',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHOC. MISKY C.LECHE 30X25 gr',
                'precio_costo' => '147.00',
                'precio_venta' => '230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LIMP. PROCENEX LIMON 900 cc',
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DESINF. LYSOFORM AIR.MONT 380 cc',
                'precio_costo' => '818.90',
                'precio_venta' => '1230',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAVAJ CF LIMON 300 ml',
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHUPET. PICO DULCE 24 un',
                'precio_costo' => '54.68',
                'precio_venta' => '90',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DES.AMB GLADE VAINILLA 360 cc',
                'precio_costo' => '440.89',
                'precio_venta' => '670',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'DETERG. MAGISTRAL LIMON MULTI 300 ml',
                'precio_costo' => '535.39',
                'precio_venta' => '810',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LIMP. PROCENEX AIRES PRIM. 900 cc',
                'precio_costo' => '335.90',
                'precio_venta' => '510',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAND. AYUDIN ANTIPLASH 1 lt',
                'precio_costo' => '304.40',
                'precio_venta' => '460',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAND. AYUDIN CLASICA 1 lt',
                'precio_costo' => '314.89',
                'precio_venta' => '480',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LAVAND. AYUDIN T.PODER GLA 1 lt',
                'precio_costo' => '293.90',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JAB.PVO ZORRO EVO QUIT 3 kg',
                'precio_costo' => '1732.39',
                'precio_venta' => '2600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LIMP. PROCENEX BEBE 900 cc',
                'precio_costo' => '335.90',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MANAOS COLA 2.25 L x36uni',
                'precio_costo' => '318.33',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AGUA SMARTWATER 591cc',
                'precio_costo' => '144.90',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AGUA MANAOS 600cc',
                'precio_costo' => '97.50',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AGUA MANAOS 2L',
                'precio_costo' => '165.00',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PEPSI LATA',
                'precio_costo' => '200.00',
                'precio_venta' => '300',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PEPSI 500cc botellita',
                'precio_costo' => '269.90',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'COCA COLA 500cc botellita',
                'precio_costo' => '330.00',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'COCA COLA 1L VIDRIO x12uni',
                'precio_costo' => '545.83',
                'precio_venta' => '850',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAGGIO 200ml MULTIFRUTA',
                'precio_costo' => '146.11',
                'precio_venta' => '250',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SPEED CHICO x24uni',
                'precio_costo' => '304.17',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GATORADE NARANJA 500cc',
                'precio_costo' => '329.89',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'POWERADE M.BLAST 500cc',
                'precio_costo' => '309.89',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'LEVITE NARANJA 1L',
                'precio_costo' => '229.90',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GATORADE UVA  500cc',
                'precio_costo' => '259.90',
                'precio_venta' => '400',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GATORADE MANZANA 500cc',
                'precio_costo' => '329.89',
                'precio_venta' => '500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAGGIO FRESH POMELO 1.5L',
                'precio_costo' => '499.90',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BAGGIO FRESH NARANJA 1.5L',
                'precio_costo' => '499.90',
                'precio_venta' => '700',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CERV BRAHMA AMARILLA 473cc',
                'precio_costo' => '545.88',
                'precio_venta' => '850',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CERV BRAHMA DORADA 473cc',
                'precio_costo' => '419.89',
                'precio_venta' => '650',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'POWERADE MANZANA 500cc',
                'precio_costo' => '309.89',
                'precio_venta' => '470',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CERV STELLA ART 473cc',
                'precio_costo' => '549.90',
                'precio_venta' => '850',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO DURAZNO MANZANA 1L',
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO DURAZNO NARANJA 1L',
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO MIX FRUTAL 1L',
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO BAGGIO MANZANA 1L ',
                'precio_costo' => '755.90',
                'precio_venta' => '1150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'SEVEN UP 500cc',
                'precio_costo' => '283.39',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'AZUCAR LEDESMA 1KG',
                'precio_costo' => '840.94',
                'precio_venta' => '1280',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CHOCOLATE FELFORT 2 CORAZONES 26gr',
                'precio_costo' => '249.90',
                'precio_venta' => '380',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO TANG LIMON DULCE 18gr',
                'precio_costo' => '69.90',
                'precio_venta' => '100',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'JUGO TANG NARANJA 18gr',
                'precio_costo' => '69.90',
                'precio_venta' => '100',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROLLO COCINA SUSSEX PREM 3X100',
                'precio_costo' => '1049.89',
                'precio_venta' => '1500',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'ROLLO COCINA SUSSEX PREM 3X100 SUELTO',
                'precio_costo' => '500.00',
                'precio_venta' => '600',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO VUAL ECOL 6X30 mt',
                'precio_costo' => '745.38',
                'precio_venta' => '1050',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'PAPEL HIGIENICO VUAL ECOL 6X30 mt SUELTO',
                'precio_costo' => '350.00',
                'precio_venta' => '450',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS REX ORIGINAL 75 gr',
                'precio_costo' => '241.40',
                'precio_venta' => '350',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GOMITAS PLENARIO DIENTITOS CADA UNO ',
                'precio_costo' => '2414.89',
                'precio_venta' => '80',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BIZCOCHITO 9 DE ORO AZUCARADOS 210g',
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'TABLETA RAID MOSQUITO CADA UNO',
                'precio_costo' => '32.81',
                'precio_venta' => '50',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'MENTITAS DRF',
                'precio_costo' => '0.00',
                'precio_venta' => '150',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'BIZCOCHITO 9 DE ORO SALVADO 210g',
                'precio_costo' => '241.40',
                'precio_venta' => '370',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'CACAO TODDY EXTREMO 360gr',
                'precio_costo' => '629.89',
                'precio_venta' => '950',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS HOJALMAR TRIANGULITO 250 gr',
                'precio_costo' => '734.89',
                'precio_venta' => '1100',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS HOJALMAR TRIANGULITO 150 gr',
                'precio_costo' => '451.38',
                'precio_venta' => '690',
                'codigo_barra' =>  null,
                'stock_actual' => '9999'
            ],
            [
                'titulo' => 'GALLETITAS SALADIX JAMON 100gr',
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