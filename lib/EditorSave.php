<?php

namespace Cohesion\Rest;

class EditorSave {
  public static function register() {
    add_action('rest_api_init', [self::class, 'register_routes']);
  }

  public static function register_routes() {
    register_rest_route('cohesion/v1', '/editor-save', [
      'methods'  => 'POST',
      'callback' => [self::class, 'handle_save'],
      'permission_callback' => '__return_true', // Open to all
      'args' => [
        'editor_content' => [
          'required' => true,
        ],
      ],
    ]);
  }

  public static function handle_save($request) {
    $editor_content = $request->get_param('editor_content');

    if (!$editor_content) {
      return new \WP_Error('no_content', 'Missing editor_content parameter', ['status' => 400]);
    }

    $post_id = 34;

    $result = wp_update_post([
      'ID'           => $post_id,
      'post_content' => $editor_content,
    ], true);

    if (is_wp_error($result)) {
      return new \WP_Error('update_failed', 'Failed to update post content', ['status' => 500]);
    }

    return [
      'success' => true,
      'message' => 'Content saved successfully',
      'post_id' => $post_id,
    ];
  }
}
