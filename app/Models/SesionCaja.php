<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SesionCaja extends Model
{
    use HasFactory;
    protected $table = 'sesiones_caja';

    /**
     * Una sesión de caja pertenece a un usuario.
     */
    public function cajero()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class);
    }

    public function comercio()
    {
        return $this->belongsTo(Comercio::class, 'comercio_id');
    }
    

    /**
     * Una sesión de caja puede tener muchos movimientos.
     */
    public function cajaMovimientos()
    {
        return $this->hasMany(CajaMovimiento::class);
    }

    public function efectivoDisponibleEnCaja()
    {
        // $retirosEfectivo $ingresosEfectivo $ventasEfectivo $descuentosEfectivo $aumentosEfectivo $pagoInversores
        $ventas =  $this->hasMany(Venta::class)
            ->where('metodos_de_pago', 0)
            ->sum('monto_total_venta');
        
        $apertura = $this->monto_inicial;

        $aumentosVentas = $this->hasMany(Venta::class)
            ->where('aumento', '>', 0)
            ->sum('aumento');

        $descuentosVentas = $this->hasMany(Venta::class)
            ->where('descuento', '>', 0)
            ->sum('descuento');

        $movimientosAdicion = $this->hasMany(CajaMovimiento::class)
            ->where('tipo', 'adicion')
            ->where('metodo_pago', "Efectivo")
            ->sum('monto');

        // Obtener los movimientos de caja (retiro) para la sesión de caja del usuario
        $movimientosRetiro = $this->hasMany(CajaMovimiento::class)
            ->where('tipo', 'retiro')
            ->where('metodo_pago', "Efectivo")
            ->sum('monto');

        $pagoInversores = $this->hasMany(PagoInversion::class)
            ->where('metodo_pago_titulo', 'Efectivo')
            ->sum('monto_abonado');

        $total = $ventas + $apertura + $aumentosVentas - $descuentosVentas + $movimientosAdicion - $movimientosRetiro - $pagoInversores;

        return $total;
    }
}