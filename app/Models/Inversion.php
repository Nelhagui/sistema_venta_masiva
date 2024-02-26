<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inversion extends Model
{
    use HasFactory;
    protected $table = 'inversiones';

    public function inversor()
    {
        return $this->belongsTo(Inversor::class);
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class)->withPivot('cantidad_invertida');
    }
}
