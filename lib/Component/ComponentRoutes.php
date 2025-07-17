<?php

namespace Cohesion\Component;

defined('ABSPATH') || exit;

class ComponentRoutes {
  public static function register() {
    register_rest_route('cohesion/v1', '/components', [
      'methods'  => 'GET',
      'callback' => [self::class, 'index'],
      'permission_callback' => '__return_true',
    ]);

    register_rest_route('cohesion/v1', '/components/(?P<id>\d+)', [
      'methods'  => 'GET',
      'callback' => [self::class, 'show'],
      'permission_callback' => '__return_true',
    ]);

    register_rest_route('cohesion/v1', '/components', [
      'methods'  => 'POST',
      'callback' => [self::class, 'store'],
      'permission_callback' => '__return_true',
    ]);

    register_rest_route('cohesion/v1', '/components/(?P<id>\d+)', [
      'methods'  => 'PUT',
      'callback' => [self::class, 'update'],
      'permission_callback' => '__return_true',
    ]);

    register_rest_route('cohesion/v1', '/components/(?P<id>\d+)', [
      'methods'  => 'DELETE',
      'callback' => [self::class, 'destroy'],
      'permission_callback' => '__return_true',
    ]);
  }

  public static function index($request) {
    $controller = new ComponentController();
    return rest_ensure_response($controller->all());
  }

  public static function show($request) {
    $id = (int) $request['id'];
    $controller = new ComponentController();
    $component = $controller->get($id);
    return $component ? rest_ensure_response($component) : new \WP_Error('not_found', 'Component not found', ['status' => 404]);
  }

  public static function store($request) {
    $controller = new ComponentController();
    $type = $request->get_param('type');
    $tree = $request->get_param('tree');

    if (!$type || !is_array($tree)) {
      return new \WP_Error('invalid_input', 'Missing or invalid type/tree', ['status' => 400]);
    }

    $id = $controller->create($type, $tree);
    return $id ? rest_ensure_response(['id' => $id]) : new \WP_Error('create_failed', 'Failed to create component', ['status' => 500]);
  }

  public static function update($request) {
    $id = (int) $request['id'];
    $controller = new ComponentController();
    $data = [];

    if ($request->get_param('type')) {
      $data['type'] = $request->get_param('type');
    }

    if ($request->get_param('tree')) {
      $data['tree'] = $request->get_param('tree');
    }

    $success = $controller->update($id, $data);
    return $success ? rest_ensure_response(['success' => true]) : new \WP_Error('update_failed', 'Failed to update component', ['status' => 500]);
  }

  public static function destroy($request) {
    $id = (int) $request['id'];
    $controller = new ComponentController();
    $success = $controller->delete($id);
    return $success ? rest_ensure_response(['success' => true]) : new \WP_Error('delete_failed', 'Failed to delete component', ['status' => 500]);
  }
}
