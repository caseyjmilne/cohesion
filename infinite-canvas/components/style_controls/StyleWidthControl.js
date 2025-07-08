import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleWidthControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const widthInput = ref('');

    watch(selected, (newVal) => {
      widthInput.value = newVal?.style?.width || '';
    });

    function onWidthInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'width', value || null);
      }
    }

    return {
      selected,
      widthInput,
      onWidthInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="width">Width</label>
      <input
        id="width"
        type="text"
        v-model="widthInput"
        @input="onWidthInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
