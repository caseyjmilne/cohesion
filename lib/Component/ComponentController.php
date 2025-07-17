<?php

namespace Cohesion\Component;

defined('ABSPATH') || exit;

class ComponentController {
  private $table;

  public function __construct() {
    global $wpdb;
    $this->table = $wpdb->prefix . 'cohesions_components';
  }

  /**
   * Create a new component.
   *
   * @param string $type
   * @param array $tree
   * @return int|false Inserted ID or false on failure
   */
  public function create($type, array $tree) {
    global $wpdb;

    $result = $wpdb->insert(
      $this->table,
      [
        'type' => sanitize_text_field($type),
        'tree' => wp_json_encode($tree),
        'created_at' => current_time('mysql'),
        'updated_at' => current_time('mysql'),
      ],
      ['%s', '%s', '%s', '%s']
    );

    return $result ? $wpdb->insert_id : false;
  }

  /**
   * Get a component by ID.
   *
   * @param int $id
   * @return object|null
   */
  public function get($id) {
    global $wpdb;

    $row = $wpdb->get_row(
      $wpdb->prepare("SELECT * FROM {$this->table} WHERE id = %d", $id)
    );

    if ($row) {
      $row->tree = json_decode($row->tree, true);
    }

    return $row;
  }

  /**
   * Update a component.
   *
   * @param int $id
   * @param array $data ['type' => string, 'tree' => array]
   * @return bool
   */
  public function update($id, array $data) {
    global $wpdb;

    $fields = [];
    $formats = [];

    if (isset($data['type'])) {
      $fields['type'] = sanitize_text_field($data['type']);
      $formats[] = '%s';
    }

    if (isset($data['tree'])) {
      $fields['tree'] = wp_json_encode($data['tree']);
      $formats[] = '%s';
    }

    $fields['updated_at'] = current_time('mysql');
    $formats[] = '%s';

    $result = $wpdb->update(
      $this->table,
      $fields,
      ['id' => $id],
      $formats,
      ['%d']
    );

    return $result !== false;
  }

  /**
   * Delete a component.
   *
   * @param int $id
   * @return bool
   */
  public function delete($id) {
    global $wpdb;

    $result = $wpdb->delete($this->table, ['id' => $id], ['%d']);
    return $result !== false;
  }

  /**
   * Get all components (optional pagination).
   *
   * @param int $limit
   * @param int $offset
   * @return array
   */
  public function all($limit = 100, $offset = 0) {
    global $wpdb;

    $results = $wpdb->get_results(
      $wpdb->prepare("SELECT * FROM {$this->table} ORDER BY id DESC LIMIT %d OFFSET %d", $limit, $offset)
    );

    foreach ($results as $result) {
      $result->tree = json_decode($result->tree, true);
    }

    return $results;
  }
}
