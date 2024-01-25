<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table = 'clientes';

    protected $hidden = [
        'comercio_id',
        'deleted_at',
        'created_at',
        'updated_at',
    ];

    public function ventas()
    {
        return $this->hasMany(Venta::class, 'cliente_id');
    }

    public function comercio()
    {
        return $this->belongsTo(Comercio::class);
    }
}
