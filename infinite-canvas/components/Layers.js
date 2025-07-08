import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../composables/useDroppedTags.js';

export default {
  name: 'Layers',
  components: {
    LayerNode: {
      name: 'LayerNode',
      props: {
        node: Object,
        depth: {
          type: Number,
          default: 0,
        },
        deleteById: Function,
      },
      inject: ['makeSelection', 'selectedElement'],
      computed: {
        isSelected() {
          return this.selectedElement === this.node.id;
        },
        paddingStyle() {
          return {
            paddingLeft: this.depth * 32 + 'px',
            paddingTop: '4px',
            paddingBottom: '4px',
            cursor: 'pointer',
            backgroundColor: this.isSelected ? 'rgba(0, 120, 215, 0.3)' : 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          };
        },
      },
      methods: {
        selectNode() {
          this.makeSelection(this.node.id, { top: 0, left: 0, width: 0, height: 0 });
        },
        deleteNode() {
          if (confirm(`Delete ${this.node.component}?`)) {
            this.deleteById(this.node.id);
          }
        },
      },
      template: `
        <li @mousedown.stop.prevent="selectNode">
          <div :style="paddingStyle">
            <span>{{ node.component }} — <strong>{{ node.tag }}</strong></span>
            <button @click.stop="deleteNode" style="margin-left: 8px; background: none; border: none; color: red; cursor: pointer;">🗑</button>
          </div>
          <ul v-if="node.children && node.children.length" style="list-style-type: none; margin: 0; padding: 0;">
            <LayerNode
              v-for="child in node.children"
              :key="child.id"
              :node="child"
              :depth="depth + 1"
              :deleteById="deleteById"
            />
          </ul>
        </li>
      `,
    },
  },
  setup() {
    const droppedTags = inject('droppedTags');
    const makeSelection = inject('makeSelection');
    const selectedElement = inject('selectedElement');
    const selectedId = computed(() => selectedElement.value);
    const { deleteById } = useDroppedTags();

    return { droppedTags, makeSelection, selectedId, deleteById };
  },
  template: `
    <div style="padding: 1rem; color: white;">
      <h3 style="margin-bottom: 0.5rem;">Layers</h3>
      <ul style="list-style-type: none; margin: 0; padding: 0;">
        <LayerNode
          v-for="node in droppedTags"
          :key="node.id"
          :node="node"
          :depth="0"
          :deleteById="deleteById"
        />
      </ul>
    </div>
  `,
};
