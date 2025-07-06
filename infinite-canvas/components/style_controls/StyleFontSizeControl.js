// ./components/style_controls/StyleFontSizeControl.js
import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleFontSizeControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const fontSizeInput = ref('');

    watch(selected, (newVal) => {
      fontSizeInput.value = newVal?.style?.fontSize || '';
    });

    function onFontSizeInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'fontSize', value);
      }
    }

    return {
      selected,
      fontSizeInput,
      onFontSizeInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="font-size">Font Size</label>
      <input
        id="font-size"
        type="text"
        v-model="fontSizeInput"
        @input="onFontSizeInput"
         class="coh-style-control__input"
      />
    </div>
  `,
};
