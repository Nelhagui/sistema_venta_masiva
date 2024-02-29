<div class="barra-lateral mini-barra-lateral">
    <!-- Logo -->
    <div class="nombre-pagina">
        <x-nav-link-ml :href="route('dashboard')">
            <x-application-logo  class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
            <span id="logo-nombre" class="oculto">rapido ventas</span>
        </x-nav-link-ml>
        
    </div>
    <nav class="navegacion">
        <ul>
            <li>
                <x-nav-link-ml :href="route('index.clientes')" :active="request()->routeIs(['index.clientes', 'create.clientes.fileUpdate'])">
                    <x-clientes-icon />
                    <span class="nav-link-lateral oculto">{{ __('Clientes') }}</span>
                </x-nav-link-ml>
            </li>
            <li>
                <x-nav-link-ml  :href="route('index.proveedores')" :active="request()->routeIs(['index.proveedores'])">
                    <x-proveedores-icon />
                    <span class="nav-link-lateral oculto">{{ __('Proveedores') }}</span>
                </x-nav-link-ml>
            </li>
            <li>
                <x-nav-link-ml :href="route('index.inversores')" :active="request()->routeIs(['index.inversores'])">
                    <x-inversores-icon />
                    <span class="nav-link-lateral oculto">{{ __('Inversores') }}</span>
                </x-nav-link-ml>
            </li>
            <li>
                <x-nav-link-ml :href="route('index.metodos')" :active="request()->routeIs(['index.metodos'])">
                    <x-metodos-pago-icon />
                    <span class="nav-link-lateral oculto">{{ __('Métodos de Pago') }}</span>
                </x-nav-link-ml>
            </li>
            <!-- <li>
                <x-nav-link-ml :href="route('index.reportes')" :active="request()->routeIs(['index.reportes'])">
                    {{ __('Reportes') }}
                </x-nav-link-ml> 
            </li> -->
        </ul>
    </nav>
    <div class="desplegable-menu">
        <p id="desplegable-btn">Abrir</p>
    </div>
</div>