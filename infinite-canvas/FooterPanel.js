export default {
  template: `
    <div id="footer-panel">
      <div
        style="color: rgb(150,150,150);"
        draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
      >
        TAG
      </div>
    </div>
  `,
  methods: {
    onDragStart(e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', 'tag'); // can be custom
      e.target.style.opacity = '0.5';
    },
    onDragEnd(e) {
      e.target.style.opacity = '';
    },
  },
};
