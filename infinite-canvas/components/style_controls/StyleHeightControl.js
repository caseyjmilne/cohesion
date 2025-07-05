// ./components/style_controls/StyleHeightControl.js
import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleHeightControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const heightInput = ref('');

    watch(selected, (newVal) => {
      heightInput.value = newVal?.style?.height || '';
    });

    function onHeightInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'height', value);
      }
    }

    return {
      selected,
      heightInput,
      onHeightInput,
    };
  },
  template: `
    <div v-if="selected">
      <label for="height">Height:</label>
      <input
        id="height"
        type="text"
        v-model="heightInput"
        @input="onHeightInput"
        placeholder="e.g. 100px or 10rem"
        style="width: 100%; padding: 4px; margin-top: 4px;"
      />
    </div>
  `,
};
