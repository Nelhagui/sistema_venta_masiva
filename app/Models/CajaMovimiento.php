<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CajaMovimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        'sesion_caja_id', 'user_id', 'tipo', 'descripcion', 'monto'
    ];
    /**
     * Un movimiento de caja pertenece a una sesión de caja.
     */

     public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function sesionCaja()
    {
        return $this->belongsTo(SesionCaja::class);
    }
}