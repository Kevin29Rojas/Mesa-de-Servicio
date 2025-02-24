<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\Usuario;
use App\Models\HistorialCaso;

class Caso extends Model
{
    use HasFactory;

    protected $fillable = ['numero_caso', 'usuario_id', 'descripcion', 'estado'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($caso) {
            $caso->numero_caso = Str::uuid();
        });
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function historial()
    {
        return $this->hasMany(HistorialCaso::class);
    }
}
