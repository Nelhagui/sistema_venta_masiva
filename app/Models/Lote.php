<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lote extends Model
{
    use HasFactory;
    protected $table = 'lotes';

    public function producto() {
        return $this->belongsTo(Producto::class);
    }
    
    public function promociones() {
        return $this->belongsToMany(Promocion::class)->withTimestamps();
    }
    
    public function ventas() {
        return $this->hasMany(Venta::class);
    }

    public function inversorProductos()
    {
        return $this->morphMany(InversorProducto::class, 'model', 'model_type', 'model_id');
    }
    
}
