<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inversor extends Model
{
    use HasFactory;
    protected $table = 'inversores';

    public function inversiones()
    {
        return $this->hasMany(Inversion::class);
    }

}
