import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import ElementBlock from './components/user_components/Element.js';
import TextBlock from './components/user_components/Text.js';
import SvgBlock from './components/user_components/Svg.js'; // ✅ Add more blocks here as needed

const blockMap = {
  [ElementBlock.type]: ElementBlock,
  [TextBlock.type]: TextBlock,
  [SvgBlock.type]: SvgBlock,
};

export default {
  name: 'ElementWrapper',
  props: ['tag', 'id', 'children', 'style', 'props'],
  emits: ['element-drop', 'add-child', 'select'],

  setup(props) {
    const makeSelection = inject('makeSelection');

    const appliedStyle = computed(() => ({
      minHeight: '40px',
      backgroundColor: 'rgb(150,150,150)',
      ...(props.style || {}),
    }));

    return {
      makeSelection,
      appliedStyle,
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
      const newType = e.dataTransfer.getData('text/plain');

      if (draggedId && draggedId !== this.id) {
        this.$emit('element-drop', { targetId: this.id, draggedId });
      } else if (newType) {
        const block = blockMap[newType];
        if (block && typeof block.create === 'function') {
          const newElement = block.create();
          this.$emit('add-child', {
            parentId: this.id,
            child: newElement,
          });
        }
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
