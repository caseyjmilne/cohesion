export default {
  name: 'Element',
  props: {
    label: {
      type: String,
      default: 'TAG',
    },
    type: {
      type: String,
      default: 'tag', // used as drag data
    },
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
