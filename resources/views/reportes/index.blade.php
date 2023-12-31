<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Reportes') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="sm:rounded-lg">
                <div id="mainReportes"></div>
                <div>
                    <canvas id="myChart"></canvas>
                </div>

                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

                <script>
                    const ctx = document.getElementById('myChart');
                    const DATA_COUNT = 7;
                    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
                    const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
                    const datapoints2 = [0, 30, 60, 60, 60, 120, NaN, 280, 120, 125, 105, 110, 170];
                    // const fechas = ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01',]; // Array de fechas
                    const meses = [
                        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                    ];

                    var producto = {!! json_encode($producto) !!};
                    var lotes = {!! json_encode($lotes) !!};

                    console.log(lotes)

                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: meses,
                            datasets: [
                                {
                                label: 'Proveedor 1',
                                data: datapoints,
                                tension: .5,
                                },
                                {
                                label: 'Proveedor 2',
                                data: datapoints2,
                                tension: .5,
                                }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                </script>

            </div>
        </div>
    </div>
</x-app-layout>