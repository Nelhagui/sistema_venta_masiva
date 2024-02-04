<x-guest-layout>
    <x-slot:title>
        Registro
    </x-slot>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div class="mt-4">
            <div class="sm:col-span-3">
                <label for="comercio" class="block text-sm font-medium leading-6 text-gray-900">Nombre del Comercio *</label>
                <div class="mt-1">
                    <input type="text" name="comercio" id="comercio" autocomplete="comercio" value="{{ old('comercio') }}"
                        autofocus
                        required
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <x-input-error :messages="$errors->get('comercio')" class="mt-2" />
                </div>
            </div>
        </div>

        <!-- Name -->
        <div class="mt-4">
            <div class="sm:col-span-3">
                <label for="nombre" class="block text-sm font-medium leading-6 text-gray-900">Nombre *</label>
                <div class="mt-1">
                    <input type="text" name="nombre" id="nombre" autocomplete="nombre" value="{{ old('nombre') }}"
                        required
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <x-input-error :messages="$errors->get('nombre')" class="mt-2" />
                </div>
            </div>
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <div class="sm:col-span-3">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email *</label>
                <div class="mt-1">
                    <input type="email" name="email" id="email" autocomplete="email" value="{{ old('email') }}"
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>
            </div>
        </div>

        <!-- Password -->
        <div class="mt-4">
            <div class="sm:col-span-3">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password *</label>
                <div class="mt-1">
                    <input type="password" name="password" id="password" autocomplete="new-password"
                        value="{{ old('password') }}" required
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <x-input-error :messages="$errors->get('password')" class="mt-2" />
                </div>
            </div>
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <div class="sm:col-span-3">
                <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirmar
                    Password *</label>
                <div class="mt-1">
                    <input type="password" name="password_confirmation" id="password_confirmation"
                        autocomplete="new-password" value="{{ old('password') }}" required
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
                </div>
            </div>
        </div>

        <div class="flex items-center justify-end mt-4">
            <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <x-primary-button class="ml-4">
                {{ __('Register') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
