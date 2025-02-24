<?php

namespace App\Http\Controllers;

use App\Models\Caso;
use App\Models\HistorialCaso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CasoController extends Controller
{
    public function index(Request $request)
    {
        $query = Caso::query();

        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        if ($request->has('numero_caso')) {
            $query->where('numero_caso', $request->numero_caso);
        }

        return Caso::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'descripcion' => 'required|string|min:10|max:255',
        ]);

        $caso = Caso::create([
            'usuario_id' => Auth::user()->id,
            'descripcion' => $request->descripcion,
            'estado' => 'Abierto',
        ]);

        return response()->json([
            'message' => 'Caso creado exitosamente.',
            'caso' => $caso
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $caso = Caso::findOrFail($id);

        if (Auth::user()->rol !== 'administrador') {
            return response()->json(['error' => 'No tienes permisos para actualizar este caso.'], 403);
        }

        $request->validate([
            'estado' => 'required|in:Abierto,En proceso,Resuelto,Cerrado',
        ]);

        $caso->estado = $request->estado;
        $caso->save();

        HistorialCaso::create([
            'caso_id' => $caso->id,
            'cambio' => "Estado cambiado a {$caso->estado} por " . auth::user()->nombre,
        ]);

        return response()->json([
            'message' => 'Estado del caso actualizado correctamente.',
            'caso' => $caso
        ], 200);
    }

    public function reportes()
    {
        return response()->json([
            'total_casos' => Caso::count(),
            'casos_abiertos' => Caso::where('estado', 'Abierto')->count(),
            'casos_en_proceso' => Caso::where('estado', 'En proceso')->count(),
            'casos_resueltos' => Caso::where('estado', 'Resuelto')->count(),
            'casos_cerrados' => Caso::where('estado', 'Cerrado')->count(),
            'casos_por_mes' => Caso::selectRaw('YEAR(created_at) as año, MONTH(created_at) as mes, COUNT(*) as total')
                ->groupByRaw('YEAR(created_at), MONTH(created_at)')
                ->orderByRaw('YEAR(created_at) DESC, MONTH(created_at) DESC')
                ->get(),
        ]);
    }
}
