// ./components/style_controls/StyleColorControl.js
import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleColorControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const colorInput = ref('');

    watch(selected, (newVal) => {
      colorInput.value = newVal?.style?.color || '';
    });

    function onColorInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'color', value);
      }
    }

    return {
      selected,
      colorInput,
      onColorInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="font-color">Text Color</label>
      <input
        id="font-color"
        type="text"
        v-model="colorInput"
        @input="onColorInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
