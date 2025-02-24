<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CasoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::options('{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');

// Autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Rutas protegidas con autenticación
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/casos', [CasoController::class, 'index']);
    Route::post('/casos', [CasoController::class, 'store']);
    Route::put('/casos/{id}', [CasoController::class, 'update']);
    Route::get('/casos/{id}/historial', [CasoController::class, 'historial']);
    Route::get('/reportes', [CasoController::class, 'reportes']); 
});
