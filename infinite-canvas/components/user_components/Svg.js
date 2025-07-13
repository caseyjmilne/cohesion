import Element from './Element.js';

const Svg = {
  name: 'Svg',
  components: { Element },

  template: `
    <Element label="SVG" type="svg" />
  `,
};

// Unique ID generator (consistent with your style)
Svg.generateId = () =>
  'svg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);

// Drag type
Svg.type = 'svg';

// Which style controls this block supports
Svg.controls = ['width', 'height', 'color', 'spacing'];

// Block factory
Svg.create = (svgContent = '<circle cx="25" cy="25" r="20" fill="blue" />') => ({
  id: Svg.generateId(),
  tag: 'svg',
  component: 'svg',
  style: {
    width: '50px',
    height: '50px',
  },
  props: {
    viewBox: '0 0 50 50',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  children: [],
  innerHTML: svgContent, // you'll need to support this in your renderer
});

export default Svg;
