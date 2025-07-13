import Element from './Element.js';

const Text = {
  name: 'Text',
  components: { Element },

  template: `
    <Element label="TEXT" type="text" />
  `,
};

Text.generateId = () =>
  'text-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);

Text.type = 'text';
Text.controls = ['typography', 'color', 'spacing'];

Text.create = (text = 'Sample text') => ({
  id: Text.generateId(),
  tag: 'p',
  component: 'text',
  style: {},
  props: {},
  children: [],
  text,
});

export default Text;
