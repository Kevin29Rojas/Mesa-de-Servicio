<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable; 
    use HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = ['nombre', 'correo', 'contrasena', 'rol'];

    protected $hidden = ['contrasena'];

    public function getAuthPassword()
    {
        return $this->contrasena; 
    }
}
