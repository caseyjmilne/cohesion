<?php 

class ComponentRenderer
{
    protected $blade;
    protected $context = [];
    protected $styleParser;

    public function __construct($blade_instance)
    {
        $this->blade = $blade_instance;
        $this->styleParser = new StyleParser();
    }

    public function render(string $editor_output): ?string
    {
        $tree = json_decode($editor_output, true);

        if (json_last_error() !== JSON_ERROR_NONE || empty($tree)) {
            return null;
        }

        // If it's a list of nodes
        if (array_keys($tree) === range(0, count($tree) - 1)) {
            $html = '';
            foreach ($tree as $node) {
                if (!is_array($node) || empty($node['component'])) {
                    continue;
                }
                $html .= $this->renderNode($node);
            }
            return $html;
        }

        // If it's a single node
        if (is_array($tree) && !empty($tree['component'])) {
            return $this->renderNode($tree);
        }

        return null;
    }

    protected function renderNode(array $node, array $localScope = []): string
    {
        $component = $node['component'];
        $props = $node['props'] ?? [];

        // Handle special components
        if ($component === 'query') {
            $name = $props['name'] ?? 'query';
            $this->context[$name] = $this->executeQuery($props);
            return $this->renderChildren($node['children'] ?? [], $localScope);
        }

        if ($component === 'loop') {
            $dataKey = $props['data'] ?? null;
            $varName = $props['as'] ?? 'item';
            $output = '';
            if (!empty($this->context[$dataKey]) && is_array($this->context[$dataKey])) {
                foreach ($this->context[$dataKey] as $item) {
                    $loopScope = array_merge($localScope, [$varName => $item]);
                    $output .= $this->renderChildren($node['children'] ?? [], $loopScope);
                }
            }
            return $output;
        }

        // Resolve bindings
        $bindings = $props['bindings'] ?? [];
        foreach ($bindings as $key => $binding) {
            $props[$key] = $this->resolveBinding($binding, $localScope);
        }
        unset($props['bindings']);

        // Render children
        if (!empty($node['children'])) {
            $props['children'] = $this->renderChildren($node['children'], $localScope);
        }

        // Parse and add styles
        if (!empty($node['style']) && is_array($node['style'])) {
            $cssString = $this->styleParser->toCssString($node['style']);
            if ($cssString) {
                $props['styles'] = $cssString;
            }
        }

        // Handle generic element
        if ($component === 'element') {
            $props['tag'] = $node['tag'] ?? 'div'; // default fallback
            return $this->blade->render('components.element', $props);
        }

        if ($component === 'text') {
            $props['tag'] = $node['tag'] ?? 'p'; // default fallback tag
            $props['text'] = $props['text'] ?? ''; // pull from props (where it's actually stored)
            return $this->blade->render('components.text', $props);
        }

        return $this->blade->render("components.$component", $props);
    }

    protected function renderChildren(array $children, array $scope): string
    {
        $html = '';
        foreach ($children as $child) {
            $html .= $this->renderNode($child, $scope);
        }
        return $html;
    }

    protected function resolveBinding(array $binding, array $scope)
    {
        switch ($binding['source']) {
            case 'loop':
                $item = reset($scope); // typically ['post' => WP_Post]
                return is_object($item) ? $item->{$binding['field']} ?? '' : '';
            case 'post':
                global $post;
                return get_post_field($binding['field'], $post);
            default:
                return '';
        }
    }

    protected function executeQuery(array $props): array
    {
        $args = [
            'post_type' => $props['type'] ?? 'post',
            'posts_per_page' => $props['limit'] ?? 5,
            'order' => $props['order'] ?? 'DESC',
        ];
        return get_posts($args);
    }
}
