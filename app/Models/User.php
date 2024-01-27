<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'comercio_id',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function comercio()
    {
        return $this->belongsTo(Comercio::class);
    }

    /**
     * Un usuario puede tener muchas sesiones de caja.
     */
    public function sesionesCaja()
    {
        return $this->hasMany(SesionCaja::class);
    }

    public function cajaMovimientos()
    {
        return $this->hasMany(CajaMovimiento::class);
    }

    public function ultimaSesionCajaAbierta()
    {
        return $this->hasOne(SesionCaja::class)
            ->whereNull('fecha_hora_cierre')
            ->latest();
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


}