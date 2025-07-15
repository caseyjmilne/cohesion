import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleLeftControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const leftInput = ref('');

    watch(selected, (newVal) => {
      leftInput.value = newVal?.style?.left || '';
    });

    function onLeftInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'left', value);
      }
    }

    return {
      selected,
      leftInput,
      onLeftInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="left">Left</label>
      <input
        id="left"
        type="text"
        v-model="leftInput"
        @input="onLeftInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
