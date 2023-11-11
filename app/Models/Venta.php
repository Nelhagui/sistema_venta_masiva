<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'ventas';
    protected $fillable = ['sesion_caja_id', 'user_id', 'monto_total'];
    
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

    public function producto() {
        return $this->belongsTo(Producto::class);
    }
    
    public function lote() {
        return $this->belongsTo(Lote::class);
    }
    
}