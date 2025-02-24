<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Caso;

class HistorialCaso extends Model
{
    use HasFactory;

    protected $fillable = ['caso_id', 'cambio'];

    public function caso()
    {
        return $this->belongsTo(Caso::class);
    }
}


