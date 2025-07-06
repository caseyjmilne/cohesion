// ./components/style_controls/StyleFontWeightControl.js
import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleFontWeightControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const fontWeightInput = ref('');

    watch(selected, (newVal) => {
      fontWeightInput.value = newVal?.style?.fontWeight || '';
    });

    function onFontWeightInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'fontWeight', value);
      }
    }

    return {
      selected,
      fontWeightInput,
      onFontWeightInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="font-weight">Font Weight</label>
      <input
        id="font-weight"
        type="text"
        v-model="fontWeightInput"
        @input="onFontWeightInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
