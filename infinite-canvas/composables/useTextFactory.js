// /composables/useTextFactory.js
export function useTextFactory() {
  function generateId() {
    return 'text-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
  }

  function createTextElement(content = 'Sample text') {
    return {
      id: generateId(),
      tag: 'p',
      component: 'text',
      props: {
        text: content,
      },
      style: {},
      children: [],
    };
  }

  return {
    generateId,
    createTextElement,
  };
}
