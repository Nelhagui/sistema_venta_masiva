@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ asset('assets/icon-shop.png') }}" class="logo" alt="Rapido Ventas Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
