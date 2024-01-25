<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetodoPago extends Model
{
    use HasFactory;

    protected $hidden = [
        'comercio_id',
        'deleted_at',
        'created_at',
        'updated_at',
        'editable',
    ];

    const TIPO_MARKUP_TEXT = [
        0 => 'Sin markup',
        1 => 'Porcentaje',
        2 => 'Monto fijo',
    ];

    public function getTipoMarkupTextAttribute()
    {
        return self::TIPO_MARKUP_TEXT[$this->tipo_markup] ?? 'Sin definir';
    }

    // usar $metodoPago->tipo_markup_text
}
