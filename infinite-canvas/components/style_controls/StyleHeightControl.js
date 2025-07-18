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
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="height">Height</label>
      <input
        id="height"
        type="text"
        v-model="heightInput"
        @input="onHeightInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
