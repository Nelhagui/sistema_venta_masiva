<?php

if (!function_exists('formatearAMoneda')) {
    function formatearAMoneda($numero)
    {
        // Convertir el número a un valor numérico si es una cadena
        $numeroConvertido = is_string($numero) ? floatval($numero) : $numero;

        // Convertir el número a dos decimales
        $numeroFormateado = number_format($numeroConvertido, 2, ',', '.');

        return $numeroFormateado;
    }
}
