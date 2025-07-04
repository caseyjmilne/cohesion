import { inject, computed, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
  name: 'ElementWrapper',
  props: ['tag', 'id', 'children', 'style'], // accepts per-element style
  emits: ['element-drop', 'add-child', 'select'],
  setup(props) {
    const makeSelection = inject('makeSelection');

    // Merge default styling with element-specific styles
    const appliedStyle = computed(() => ({
      minHeight: '40px',
      backgroundColor: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      position: 'relative',
      padding: '4px',
      ...(props.style || {})
    }));

    return {
      makeSelection,
      appliedStyle
    };
  },
  methods: {
    onMouseDown(e) {
      e.stopPropagation();
      console.log(`mousedown on element ${this.id}`);
      e.currentTarget.setAttribute('draggable', 'true');
      this.$emit('select', this.id);

      const rect = e.currentTarget.getBoundingClientRect();
      this.makeSelection(this.id, rect);
    },
    onDragStart(e) {
      console.log(`dragstart from ${this.id}`);
      e.dataTransfer.setData('element-id', this.id);
    },
    onDragEnd(e) {
      e.currentTarget.removeAttribute('draggable');
    },
    onDrop(e) {
      e.stopPropagation();
      const draggedId = e.dataTransfer.getData('element-id');
      const newTag = e.dataTransfer.getData('text/plain');

      console.log(`drop on ${this.id}`, { draggedId, newTag });

      if (draggedId && draggedId !== this.id) {
        this.$emit('element-drop', { targetId: this.id, draggedId });
      } else if (newTag === 'tag') {
        const newId = Date.now() + Math.random();
        this.$emit('add-child', {
          parentId: this.id,
          child: {
            id: 'tag-' + newId,
            tag: 'section',
            style: {}, // style lives directly on the element
            children: []
          }
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
