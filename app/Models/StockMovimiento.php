<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovimiento extends Model
{
    use HasFactory;
    /**
     * Un movimiento de stock pertenece a un producto.
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}