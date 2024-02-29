@props(['active'])

@php
$classes = ($active ?? false)
            ? 'items-center nav-link-ml active'
            : 'items-center nav-link-ml';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
