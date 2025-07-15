import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleBottomControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const bottomInput = ref('');

    watch(selected, (newVal) => {
      bottomInput.value = newVal?.style?.bottom || '';
    });

    function onBottomInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'bottom', value);
      }
    }

    return {
      selected,
      bottomInput,
      onBottomInput,
    };
  },

  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="bottom">Bottom</label>
      <input
        id="bottom"
        type="text"
        v-model="bottomInput"
        @input="onBottomInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
