import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useElementFactory } from './composables/useElementFactory.js';

export default {
  name: 'ElementWrapper',
  props: ['tag', 'id', 'children', 'style'],
  emits: ['element-drop', 'add-child', 'select'],
  setup(props) {
    const makeSelection = inject('makeSelection');
    const { createElement } = useElementFactory();

    const appliedStyle = computed(() => ({
      minHeight: '40px',
      backgroundColor: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      position: 'relative',
      padding: '4px',
      ...(props.style || {}),
    }));

    return {
      makeSelection,
      appliedStyle,
      createElement,
    };
  },
  methods: {
    onMouseDown(e) {
      e.stopPropagation();
      e.currentTarget.setAttribute('draggable', 'true');
      this.$emit('select', this.id);
      const rect = e.currentTarget.getBoundingClientRect();
      this.makeSelection(this.id, rect);
    },
    onDragStart(e) {
      e.dataTransfer.setData('element-id', this.id);
    },
    onDragEnd(e) {
      e.currentTarget.removeAttribute('draggable');
    },
    onDrop(e) {
      e.stopPropagation();
      const draggedId = e.dataTransfer.getData('element-id');
      const newTag = e.dataTransfer.getData('text/plain');

      if (draggedId && draggedId !== this.id) {
        this.$emit('element-drop', { targetId: this.id, draggedId });
      } else if (newTag === 'tag') {
        const newElement = this.createElement('section');
        this.$emit('add-child', {
          parentId: this.id,
          child: newElement,
        });
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
      :style="appliedStyle"
    >
      {{ id }}

      <ElementWrapper
        v-for="child in children || []"
        :key="child.id"
        :id="child.id"
        :tag="child.tag"
        :style="child.style"
        :children="child.children"
        @element-drop="$emit('element-drop', $event)"
        @add-child="$emit('add-child', $event)"
        @select="$emit('select', $event)"
      />
    </component>
  `,
};
