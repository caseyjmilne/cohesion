import { inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useElementFactory } from './composables/useElementFactory.js';
import { useTextFactory } from './composables/useTextFactory.js';
import ElementWrapper from './ElementWrapper.js';

export default {
  components: { ElementWrapper },

  data() {
    const droppedTags = inject('droppedTags');
    return { droppedTags };
  },

  setup() {
    const { createElement } = useElementFactory();
    const { createTextElement } = useTextFactory();
    return { createElement, createTextElement };
  },

  methods: {
    onDragOver(e) {
      e.preventDefault();
    },

    onDrop(e) {
      e.preventDefault();
      const type = e.dataTransfer.getData('text/plain');

      if (type === 'tag') {
        this.droppedTags.push(this.createElement('section'));
      } else if (type === 'text') {
        this.droppedTags.push(this.createTextElement('Sample text'));
      }
    },

    onElementDrop({ draggedId, targetId }) {
      const findAndRemove = (nodes, id) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) return nodes.splice(i, 1)[0];
          if (nodes[i].children) {
            const result = findAndRemove(nodes[i].children, id);
            if (result) return result;
          }
        }
        return null;
      };

      const findAndInsert = (nodes, id, element) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            nodes.splice(i, 0, element);
            return true;
          }
          if (nodes[i].children) {
            const inserted = findAndInsert(nodes[i].children, id, element);
            if (inserted) return true;
          }
        }
        return false;
      };

      const moved = findAndRemove(this.droppedTags, draggedId);
      if (moved) {
        findAndInsert(this.droppedTags, targetId, moved);
      }
    },

    onAddChild({ parentId, child }) {
      const insertChild = (nodes) => {
        for (const node of nodes) {
          if (node.id === parentId) {
            node.children = node.children || [];
            node.children.push(child);
            return true;
          }
          if (node.children && insertChild(node.children)) {
            return true;
          }
        }
        return false;
      };

      insertChild(this.droppedTags);
    },
  },

  template: `
    <div class="breakpoint" @dragover="onDragOver" @drop="onDrop">
      <ElementWrapper
        v-for="tag in droppedTags"
        :key="tag.id"
        :id="tag.id"
        :tag="tag.tag"
        :props="tag.props"
        :style="tag.style"
        :children="tag.children"
        @element-drop="onElementDrop"
        @add-child="onAddChild"
      />
    </div>
  `,
};
