import { defineComponent, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default defineComponent({
  name: 'PanelSection',
  props: {
    label: {
      type: String,
      required: true,
    },
    defaultOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const isOpen = ref(props.defaultOpen);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      toggle,
    };
  },
  template: `
    <div class="coh-panel-section">
      <div
        class="coh-panel-section__header"
        @click="toggle"
      >
        {{ label }} <span style="float: right;">{{ isOpen ? '▾' : '▸' }}</span>
      </div>
      <div v-if="isOpen" class="coh-panel-section__content">
        <slot></slot>
      </div>
    </div>
  `,
});
