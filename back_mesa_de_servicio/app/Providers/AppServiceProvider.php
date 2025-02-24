<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;

class AppServiceProvider extends ServiceProvider
{


    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
{
    if (App::runningInConsole()) {
        return;
    }

    Route::post('/register', function () {
        request()->merge(['_token' => csrf_token()]);
    });

    app()->resolving(VerifyCsrfToken::class, function ($middleware) {
        $middleware->except(['/register', '/login', '/logout', '/casos', '/reportes',]);
    });

    Route::options('{any}', function () {
        return response()->json([], 200);
    })->where('any', '.*');
}
}
