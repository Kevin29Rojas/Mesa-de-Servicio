<?php

namespace App\Http\Controllers;

use App\Models\Caso;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email|unique:usuarios',
            'contrasena' => 'required|min:6',
            'rol' => 'required|in:cliente,administrador',
        ]);

        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'correo' => $request->correo,
            'contrasena' => Hash::make($request->contrasena),
            'rol' => $request->rol,
        ]);

        return response()->json(['usuario' => $usuario], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'contrasena' => 'required|min:6',
        ]);

        if (!Auth::attempt(['correo' => $request->correo, 'password' => $request->contrasena])) {
            return response()->json(['error' => 'Correo o contraseña incorrectos.'], 401);
        }

        /** @var Usuario $usuario */
        $usuario = Auth::user();
        $token = $usuario->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'token' => $token,
            'usuario' => [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'correo' => $usuario->correo,
                'rol' => $usuario->rol
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user && $request->bearerToken() && !($user->currentAccessToken() instanceof \Laravel\Sanctum\TransientToken)) {
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        }

        return response()->json(['message' => 'Sesión cerrada correctamente.'], 200);
    }
}
