import { inject, computed, onMounted, onBeforeUnmount, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../composables/useDroppedTags.js';

export default {
  name: 'Layers',

  components: {
    LayerNode: {
      name: 'LayerNode',

      props: {
        node:   Object,
        depth:  { type: Number, default: 0 },
        deleteById: Function,
      },

      inject: ['makeSelection', 'selectedElement'],

      data() {
        return {
          ctx: reactive({
            visible: false,
            x: 0,
            y: 0,
          }),
        };
      },

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
            backgroundColor: this.isSelected
              ? 'rgba(0, 120, 215, 0.3)'
              : 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          };
        },
      },

      mounted() {
        document.addEventListener('click', this.hideContextMenu);
      },
      beforeUnmount() {
        document.removeEventListener('click', this.hideContextMenu);
      },

      methods: {
        /* Selection + delete --------------------------------------------- */
        selectNode() {
          this.makeSelection(this.node.id, { top: 0, left: 0, width: 0, height: 0 });
        },
        deleteNode() {
          if (confirm(`Delete ${this.node.component}?`)) {
            this.deleteById(this.node.id);
          }
        },

        /* Context‑menu handling ------------------------------------------ */
        showContextMenu(e) {
          e.preventDefault();
          this.ctx.visible = true;
          this.ctx.x = e.clientX;
          this.ctx.y = e.clientY;
        },
        hideContextMenu() {
          this.ctx.visible = false;
        },
        makeComponentFromNode() {
          // 👉 Replace with real implementation
          alert(`Make Component from ${this.node.id}`);
          this.ctx.visible = false;
        },
      },

      template: `
        <li
          @mousedown.stop.prevent="selectNode"
          @contextmenu.stop.prevent="showContextMenu"
        >
          <div :style="paddingStyle">
            <span>{{ node.component }} — <strong>{{ node.tag }}</strong></span>
            <button
              @click.stop="deleteNode"
              style="margin-left: 8px; background: none; border: none; color: red; cursor: pointer;"
            >
              🗑
            </button>
          </div>

          <!-- Context menu -->
          <div
            v-if="ctx.visible"
            :style="{
              position: 'fixed',
              top: ctx.y + 'px',
              left: ctx.x + 'px',
              backgroundColor: '#222',
              border: '1px solid #555',
              padding: '4px 0',
              color: 'white',
              zIndex: 1000,
              fontSize: '12px',
              minWidth: '150px'
            }"
          >
            <div
              @click="makeComponentFromNode"
              style="padding: 6px 12px; cursor: pointer;"
            >
              Make Component
            </div>
          </div>

          <!-- Recursive children -->
          <ul
            v-if="node.children && node.children.length"
            style="list-style-type: none; margin: 0; padding: 0;"
          >
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
    const droppedTags     = inject('droppedTags');
    const makeSelection   = inject('makeSelection');
    const selectedElement = inject('selectedElement');
    const selectedId      = computed(() => selectedElement.value);
    const { deleteById }  = useDroppedTags();

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
