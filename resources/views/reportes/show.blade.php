<x-app-layout>
    {{-- <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Reportes') }}
        </h2>
    </x-slot> --}}
    <style>
        .title-section {
            font-size: 1.8em;
            margin-bottom: 1rem;
        }
    </style>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="title-section">
                <h1 style="font-size: 44">{{ $producto->titulo }}</h1>
            </div>
            <div class="sm:rounded-lg">
                <div>
                    @php
                        $urlParts = explode('/', Request::url());
                        $year = $urlParts[count($urlParts) - 2];
                        $month = end($urlParts);
                    @endphp

                    <input type="month" id="selecDate"
                        value="{{ $year }}-{{ str_pad($month, 2, '0', STR_PAD_LEFT) }}">
                    <canvas id="myChart"></canvas>
                </div>
                <div id="mainReportes"></div>

                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

                <script>
                    function formatearFecha(fecha) {
                        // Parsea la fecha en formato "aaaa-mm-dd"
                        var fechaParseada = new Date(fecha);

                        // Obtiene el día de la fecha
                        var dia = fechaParseada.getDate();

                        return ('0' + dia).slice(-2);
                    }

                    const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125];
                    var comprasDelMes = {!! json_encode($comprasDelMes) !!};
                    var proveedores = {!! json_encode($proveedores) !!};
                    var diasDelMes = {!! json_encode($fechasDelMes) !!};

                    const diasDelMesFormat = diasDelMes.map((dia) => formatearFecha(dia));
                    const diasDelMesFormatOrdenados = diasDelMesFormat.sort((a, b) => parseInt(a) - parseInt(b));

                    let comprasDelProveedor = {};

                    // Inicializa el array de precios para cada proveedor
                    proveedores.forEach(function(proveedor) {
                        comprasDelProveedor[proveedor] = [];
                    });

                    for (let iprove = 0; iprove < proveedores.length; iprove++) {
                        let valorEnFechaActualEncontrada = 0;
                        for (let iddm = 0; iddm < diasDelMes.length; iddm++) {
                            let compraEnFechaActualEncontrada = false;
                            for (let icompdm = 0; icompdm < comprasDelMes.length; icompdm++) {

                                if (
                                    diasDelMes[iddm] == comprasDelMes[icompdm]['compra']['fecha_compra'] &&
                                    comprasDelMes[icompdm]['compra']['proveedor']['nombre'] == proveedores[iprove]
                                ) {
                                    comprasDelProveedor[proveedores[iprove]].push(comprasDelMes[icompdm]['precio_unitario'])
                                    compraEnFechaActualEncontrada = true;
                                    valorEnFechaActualEncontrada = comprasDelProveedor[proveedores[iprove]].push(comprasDelMes[icompdm][
                                        'precio_unitario'
                                    ]);
                                    break;
                                }
                            }
                            if (!compraEnFechaActualEncontrada) {
                                comprasDelProveedor[proveedores[iprove]].push('NaN')
                            }

                        }

                    }

                    console.warn(comprasDelProveedor);

                    const ctx = document.getElementById('myChart');
                    const DATA_COUNT = 7;
                    const NUMBER_CFG = {
                        count: DATA_COUNT,
                        min: -100,
                        max: 100
                    };




                    const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
                    const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

                    const newDataStructure = proveedores.map((proveedor, index) => {
                        return {
                            label: proveedor,
                            data: comprasDelProveedor[proveedores[index]],
                            segment: {
                                borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                                borderDash: ctx => skipped(ctx, [6, 6]),
                            },
                            spanGaps: true
                        }
                    })
                    console.warn('rprorreee', newDataStructure);


                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: diasDelMesFormat,
                            datasets: newDataStructure,
                            segment: {
                                borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                                borderDash: ctx => skipped(ctx, [6, 6]),
                            },
                            spanGaps: true
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });


                    document.getElementById('selecDate').addEventListener('change', function() {
                        var selectedDate = this.value; // Obtener la fecha seleccionada
                        // Separar la fecha en año y mes
                        var year = selectedDate.split('-')[0];
                        var month = selectedDate.split('-')[1];
                        var currentUrl = window.location.href; // Obtener la URL actual
                        // Extraer el ID del producto de la URL
                        var productId = currentUrl.match(/\/costo\/(\d+)/)[1];
                        // Construir la nueva URL con la fecha seleccionada y el ID del producto
                        var newUrl = "/reportes/productos/costo/" + productId + "/" + year + "/" + month;
                        // Redirigir a la nueva URL
                        window.location.href = newUrl;
                    });
                </script>

            </div>
        </div>
    </div>
</x-app-layout>
