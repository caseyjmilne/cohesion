import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleBackgroundColorControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const bgColorInput = ref('');

    watch(selected, (newVal) => {
      bgColorInput.value = newVal?.style?.backgroundColor || '';
    });

    function onBgColorInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'backgroundColor', value);
      }
    }

    return {
      selected,
      bgColorInput,
      onBgColorInput,
    };
  },
  template: `
    <div v-if="selected">
      <label for="bg-color">Background Color:</label>
      <input
        id="bg-color"
        type="text"
        v-model="bgColorInput"
        @input="onBgColorInput"
        placeholder="e.g. red or #ff0000"
        style="width: 100%; padding: 4px; margin-top: 4px;"
      />
    </div>
  `,
};
