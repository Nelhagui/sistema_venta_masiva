<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class LectorController extends Controller
{
    public function index()
    {
        return view('lector.index');
    }
}