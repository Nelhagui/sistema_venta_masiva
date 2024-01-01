<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;
    protected $table = 'compras';

    public function detalles()
    {
        return $this->hasMany(CompraDetalle::class, 'compra_id');
    }
    public function productos()
    {
        return $this->detalles()->with('producto')->get()->pluck('producto');
    }
    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }
}
