import { inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export function useDroppedTags() {
  const droppedTags = inject('droppedTags');
  if (!droppedTags) {
    throw new Error('droppedTags not provided');
  }

  // Find element by ID recursively
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

  // ✅ Add or replace a single CSS property
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

  return {
    droppedTags,
    findById,
    updateStyle, // ✅ expose the new function
  };
}
