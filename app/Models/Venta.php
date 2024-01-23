<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'ventas';
    protected $fillable = ['sesion_caja_id', 'user_id', 'monto_total'];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
    
    public function sesionCaja()
    {
        return $this->belongsTo(SesionCaja::class, 'sesion_caja_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detalles()
    {
        return $this->hasMany(DetalleVenta::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'venta_id');
    }

    public function producto() {
        return $this->belongsTo(Producto::class);
    }
    
    public function lote() {
        return $this->belongsTo(Lote::class);
    }

    public function metodoPago() {
        return $this->belongsTo(MetodoPago::class);
    }

    public function montoPendiente()
    {
        return $this->monto_total - $this->pagos->sum('monto_pagado');
    }
    
}