import Element from './Element.js';

const Anchor = {
  name: 'Anchor',
  components: { Element },

  template: `
    <Element label="ANCHOR" type="anchor" />
  `,
};

Anchor.generateId = () =>
  'anchor-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);

Anchor.type = 'anchor';
Anchor.controls = ['typography', 'color', 'spacing'];

Anchor.create = () => ({
  id: Anchor.generateId(),
  tag: 'a',
  component: 'anchor',
  style: {},
  props: {
    href: '#'
  },
  children: [],
});

export default Anchor;
