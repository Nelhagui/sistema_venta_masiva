<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InversorProducto extends Model
{
    use HasFactory;
    protected $table = 'inversor_productos';

    public function model()
    {
        return $this->morphTo();
    }

    public function inversor() 
    {
        return $this->belongsTo(Inversor::class);
    }
}
