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


function mytheme_create_components_table() {
  global $wpdb;

  $table_name = $wpdb->prefix . 'cohesion_components';

  $charset_collate = $wpdb->get_charset_collate();

  $sql = "
    CREATE TABLE IF NOT EXISTS $table_name (
      id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
      type VARCHAR(50) NOT NULL,
      tree JSON NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) $charset_collate;
  ";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  dbDelta($sql);
}
add_action('after_switch_theme', 'mytheme_create_components_table');



