import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useElementFactory } from './composables/useElementFactory.js';
import { useTextFactory } from './composables/useTextFactory.js';

export default {
  name: 'ElementWrapper',
  props: ['tag', 'id', 'children', 'style', 'props'],
  emits: ['element-drop', 'add-child', 'select'],
  setup(props) {
    const makeSelection = inject('makeSelection');
    const { createElement } = useElementFactory();
    const { createTextElement } = useTextFactory();

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
      createTextElement,
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
      } else if (newTag === 'text') {
        const newText = this.createTextElement('Sample text');
        this.$emit('add-child', {
          parentId: this.id,
          child: newText,
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
      {{ props?.text }}

      <ElementWrapper
        v-for="child in children || []"
        :key="child.id"
        :id="child.id"
        :tag="child.tag"
        :style="child.style"
        :children="child.children"
        :props="child.props"
        @element-drop="$emit('element-drop', $event)"
        @add-child="$emit('add-child', $event)"
        @select="$emit('select', $event)"
      />
    </component>
  `,
};
