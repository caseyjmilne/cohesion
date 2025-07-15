<?php 

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('tailwind-style', get_template_directory_uri() . '/assets/output.css', [], null);
    
    if( is_page('canvas') ) {
        wp_enqueue_style('cohesion-editor-style', get_template_directory_uri() . '/infinite-canvas/editor.css', [], null);
    }
    
});

// Blade configuration.

require_once get_template_directory() . '/vendor/autoload.php';


use Jenssegers\Blade\Blade;

add_action('after_setup_theme', function () {
    $views = __DIR__ . '/views';
    $cache = __DIR__ . '/cache';

    if (!file_exists($cache)) {
        mkdir($cache);
    }

    $GLOBALS['blade'] = new Blade($views, $cache);
});

// Render editor output. 

require_once( get_template_directory() . '/lib/ComponentRenderer.php' );
require_once( get_template_directory() . '/lib/StyleParser.php' );
require_once( get_template_directory() . '/lib/EditorSave.php' );

\Cohesion\Rest\EditorSave::register();


