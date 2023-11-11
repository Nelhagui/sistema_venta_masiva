<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleVenta extends Model
{
    use HasFactory;
    protected $table = 'detalle_ventas';

    // Relación con el modelo Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    // Si también quieres establecer la relación con el modelo Venta, puedes agregar:
    public function venta()
    {
        return $this->belongsTo(Venta::class);
    }
}