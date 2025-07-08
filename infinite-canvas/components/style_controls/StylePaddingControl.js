import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StylePaddingControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const paddingInput = ref('');

    watch(selected, (newVal) => {
      paddingInput.value = newVal?.style?.padding || '';
    });

    function onPaddingInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'padding', value);
      }
    }

    return {
      selected,
      paddingInput,
      onPaddingInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="padding">Padding</label>
      <input
        id="padding"
        type="text"
        v-model="paddingInput"
        @input="onPaddingInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
