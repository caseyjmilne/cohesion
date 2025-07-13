const Element = {
  name: 'Element',

  props: {
    label: { type: String, default: 'TAG' },
    type:  { type: String, default: 'tag' },
  },

  template: `
    <div
      style="color: rgb(150,150,150); cursor: grab;"
      draggable="true"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
    >
      {{ label }}
    </div>
  `,

  methods: {
    onDragStart(e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', this.type);
      e.target.style.opacity = '0.5';
    },
    onDragEnd(e) {
      e.target.style.opacity = '';
    },
  },
};

// 🔧 Consistent ID generator
Element.generateId = () =>
  'tag-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);

// 🧱 Block factory
Element.type = 'tag';
Element.controls = ['background', 'spacing'];
Element.create = (tag = 'section') => ({
  id: Element.generateId(),
  tag,
  component: 'element',
  style: {},
  children: [],
});

export default Element;
