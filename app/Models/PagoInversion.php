<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagoInversion extends Model
{
    use HasFactory;
    protected $table = 'pago_inversiones';

    public function inversion()
    {
        return $this->belongsTo(Inversion::class);
    }
}
