// ./components/style_controls/StyleFontFamilyControl.js
import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleFontFamilyControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const fontFamilyInput = ref('');

    watch(selected, (newVal) => {
      fontFamilyInput.value = newVal?.style?.fontFamily || '';
    });

    function onFontFamilyInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'fontFamily', value);
      }
    }

    return {
      selected,
      fontFamilyInput,
      onFontFamilyInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="font-family">Font Family</label>
      <input
        id="font-family"
        type="text"
        v-model="fontFamilyInput"
        @input="onFontFamilyInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
