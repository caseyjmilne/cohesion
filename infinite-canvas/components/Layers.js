import { inject, defineComponent, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default defineComponent({
  name: 'Layers',
  setup() {
    const droppedTags = inject('droppedTags');
    const makeSelection = inject('makeSelection');
    const selectedElement = inject('selectedElement');

    const selectedId = computed(() => selectedElement.value);

    return { droppedTags, makeSelection, selectedId };
  },
  components: {
    LayerNode: {
      name: 'LayerNode',
      props: {
        node: Object,
        depth: {
          type: Number,
          default: 0,
        },
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
          };
        },
      },
      methods: {
        selectNode() {
          // Pass dummy rect since we don't have actual bounding rect here
          this.makeSelection(this.node.id, { top: 0, left: 0, width: 0, height: 0 });
        },
      },
      template: `
        <li @mousedown.stop.prevent="selectNode">
          <div :style="paddingStyle">
            {{ node.component }} — <strong>{{ node.tag }}</strong>
          </div>
          <ul v-if="node.children && node.children.length" style="list-style-type: none; margin: 0; padding: 0;">
            <LayerNode
              v-for="child in node.children"
              :key="child.id"
              :node="child"
              :depth="depth + 1"
            />
          </ul>
        </li>
      `,
    },
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
        />
      </ul>
    </div>
  `,
});
