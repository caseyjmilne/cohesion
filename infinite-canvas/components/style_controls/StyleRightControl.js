import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleRightControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const rightInput = ref('');

    watch(selected, (newVal) => {
      rightInput.value = newVal?.style?.right || '';
    });

    function onRightInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'right', value);
      }
    }

    return {
      selected,
      rightInput,
      onRightInput,
    };
  },

  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="right">Right</label>
      <input
        id="right"
        type="text"
        v-model="rightInput"
        @input="onRightInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
