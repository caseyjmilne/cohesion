import { inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
  props: ['tag', 'id'],
  emits: ['element-drop', 'select'],
  setup() {
    const makeSelection = inject('makeSelection');

    function onMouseDown(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      makeSelection({
        top: rect.top - 1,
        left: rect.left - 1,
        width: rect.width + 2,
        height: rect.height + 2,
      });
    }

    return { onMouseDown };
  },
  data() {
    return {
      selectedRect: null,  // { top, left, width, height } or null
    };
  },
  methods: {
    onMouseDown(e) {
      e.currentTarget.setAttribute('draggable', 'true');

      // Calculate bounding rect on mousedown
      const rect = e.currentTarget.getBoundingClientRect();

      // Add 1px offset for border outside the element
      this.selectedRect = {
        top: rect.top - 1,
        left: rect.left - 1,
        width: rect.width + 2,
        height: rect.height + 2,
      };

      // Emit selection event (optional)
      this.$emit('select', this.id);
    },
    onDragStart(e) {
      e.dataTransfer.setData('element-id', this.id);
    },
    onDragEnd(e) {
      e.currentTarget.removeAttribute('draggable');
    },
    onDrop(e) {
      const draggedId = e.dataTransfer.getData('element-id');
      if (draggedId && draggedId !== this.id) {
        this.$emit('element-drop', { targetId: this.id, draggedId });
      }
    },
  },
  template: `
    <component
      :is="tag"
      class="droppable-element"
      @mousedown="onMouseDown"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @drop="onDrop"
      @dragover.prevent
      style="height: 40px; background-color: black; color: white; display: flex; align-items: center; justify-content: center; position: relative;"
    >
      {{ id }}

      <!-- Selection border overlay -->
      <div
        v-if="selectedRect"
        :style="{
          position: 'fixed',
          top: selectedRect.top + 'px',
          left: selectedRect.left + 'px',
          width: selectedRect.width + 'px',
          height: selectedRect.height + 'px',
          border: '1px solid #4A90E2',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          zIndex: 9999,
        }"
      ></div>
    </component>
  `,
};
