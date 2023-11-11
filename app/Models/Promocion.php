<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promocion extends Model
{
    use HasFactory;
    protected $table = 'promociones';

    public function producto() {
        return $this->belongsTo(Producto::class);
    }
    
    public function lotes() {
        return $this->belongsToMany(Lote::class)->withTimestamps();
    }
    
    
}
