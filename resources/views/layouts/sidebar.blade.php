<div class="barra-lateral mini-barra-lateral" id="sidebar">
    <!-- Logo -->
    <div class="nombre-pagina">
        <x-nav-link-ml :href="route('dashboard')">
            <x-application-logo class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
            <span class="logo-nombre">RapidoVentas</span>
        </x-nav-link-ml>

    </div>
    <nav class="navegacion">
        <ul>
            <li>
                <x-nav-link-ml :href="route('index.clientes')" :active="request()->routeIs(['index.clientes', 'create.clientes.fileUpdate'])">
                    <x-clientes-icon />
                    <span class="nav-link-lateral">{{ __('Clientes') }}</span>
                </x-nav-link-ml>
            </li>
            <li>
                <x-nav-link-ml :href="route('index.proveedores')" :active="request()->routeIs(['index.proveedores'])">
                    <x-proveedores-icon class="block" />
                    <span class="nav-link-lateral">{{ __('Proveedores') }}</span>
                </x-nav-link-ml>
            </li>
            <li>
                <x-nav-link-ml :href="route('index.inversores')" :active="request()->routeIs(['index.inversores'])">
                    <x-inversores-icon />
                    <span class="nav-link-lateral">{{ __('Inversores') }}</span>
                </x-nav-link-ml>
            </li>
            <li>
                <x-nav-link-ml :href="route('index.metodos')" :active="request()->routeIs(['index.metodos'])">
                    <x-metodos-pago-icon />
                    <span class="nav-link-lateral">{{ __('Métodos de Pago') }}</span>
                </x-nav-link-ml>
            </li>
            <!-- <li>
                    <x-nav-link-ml :href="route('index.reportes')" :active="request()->routeIs(['index.reportes'])">
                        {{ __('Reportes') }}
                    </x-nav-link-ml>
                </li> -->
        </ul>
    </nav>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
    var sidebar = document.getElementById('sidebar');

    // Agrega un listener para el evento 'mouseenter' (pasa el ratón sobre el elemento)
    sidebar.addEventListener('mouseenter', function() {
        // Añade una clase al sidebar para abrirlo
        sidebar.classList.add('barra-lateral-abierto');
    });

    // Agrega un listener para el evento 'mouseleave' (saca el ratón del elemento)
    sidebar.addEventListener('mouseleave', function() {
        // Remueve la clase del sidebar para cerrarlo
        sidebar.classList.remove('barra-lateral-abierto');
    });
});

</script>
