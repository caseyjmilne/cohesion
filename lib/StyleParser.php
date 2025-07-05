<?php

class StyleParser
{
    /**
     * Converts a PHP array of camelCased CSS properties to a kebab-case CSS string.
     *
     * @param array $styleArray
     * @return string|null
     */
    public function toCssString(array $styleArray): ?string
    {
        if (empty($styleArray)) {
            return null;
        }

        $cssRules = [];

        foreach ($styleArray as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            // Convert camelCase to kebab-case
            $kebabKey = strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $key));
            $cssRules[] = "{$kebabKey}: {$value}";
        }

        return empty($cssRules) ? null : implode('; ', $cssRules);
    }
}
