<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comercio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'email'
    ];

    public function clientes()
    {
        return $this->hasMany(Cliente::class);
    }

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
    public function metodosDePago()
    {
        return $this->hasMany(MetodoPago::class);
    }

    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
    public function lotes()
    {
        return $this->hasMany(Lote::class);
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class);
    }

    public function inversores()
    {
        return $this->hasMany(Inversor::class);
    }

    public function proveedores()
    {
        return $this->hasMany(Proveedor::class);
    }

    public function usuarios()
    {
        return $this->hasMany(User::class);
    }

    public function sesionesCaja()
    {
        return $this->hasMany(SesionCaja::class);
    }
}
