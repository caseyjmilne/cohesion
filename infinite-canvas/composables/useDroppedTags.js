import { inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export function useDroppedTags() {
  const droppedTags = inject('droppedTags');
  if (!droppedTags) {
    throw new Error('droppedTags not provided');
  }

  // ✅ Find element by ID recursively
  function findById(id, node = droppedTags.value) {
    for (const el of node) {
      if (el.id === id) return el;
      if (el.children) {
        const result = findById(id, el.children);
        if (result) return result;
      }
    }
    return null;
  }

  // ✅ Update or add a style property
  function updateStyle(elementId, property, value) {
    const el = findById(elementId);
    if (!el) {
      console.warn(`Element with ID ${elementId} not found`);
      return;
    }

    if (!el.style) {
      el.style = {};
    }

    el.style[property] = value;
  }

  // ✅ Update or merge props
  function updateProps(elementId, newProps) {
    const el = findById(elementId);
    if (!el) {
      console.warn(`Element with ID ${elementId} not found`);
      return;
    }

    el.props = {
      ...(el.props || {}),
      ...newProps,
    };
  }

  // ✅ Delete an element by ID (and remove from children tree)
  function deleteById(id, nodes = droppedTags.value) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const el = nodes[i];

      if (el.id === id) {
        nodes.splice(i, 1);
        return true;
      }

      if (el.children && deleteById(id, el.children)) {
        return true;
      }
    }
    return false;
  }

  return {
    droppedTags,
    findById,
    updateStyle,
    updateProps,
    deleteById, // ✅ exposed
  };
}
