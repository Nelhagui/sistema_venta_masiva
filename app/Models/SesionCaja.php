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
}