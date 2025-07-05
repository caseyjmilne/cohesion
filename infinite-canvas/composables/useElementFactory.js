export function useElementFactory() {
  function generateId() {
    return 'tag-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
  }

  function createElement(tag = 'section') {
    return {
      id: generateId(),
      tag,
      component: 'element',
      style: {},
      children: [],
    };
  }

  return {
    generateId,
    createElement,
  };
}
