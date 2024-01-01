<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = [
        'titulo', 'descripcion', 'precio_costo', 'precio_venta', 'stock', 'codigo_barra'
    ];

    // Relación con Ventas
    public function lotes() {
        return $this->hasMany(Lote::class);
    }
    
    public function promociones() {
        return $this->hasMany(Promocion::class);
    }
    
    public function ventas() {
        return $this->hasMany(Venta::class);
    }
    
    public function inversorProductos()
    {
        return $this->morphMany(InversorProducto::class, 'model', 'model_type', 'model_id');
    }

    public function compraDetalles()
    {
        return $this->hasMany(CompraDetalle::class, 'producto_id');
    }
}