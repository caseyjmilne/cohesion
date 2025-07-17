<a href="{{ $href }}" {!! isset($styles) ? 'style="' . e($styles) . '"' : '' !!}>
    {!! $children ?? '' !!}
</a>