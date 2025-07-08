import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleMarginControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const marginInput = ref('');

    watch(selected, (newVal) => {
      marginInput.value = newVal?.style?.margin || '';
    });

    function onMarginInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'margin', value);
      }
    }

    return {
      selected,
      marginInput,
      onMarginInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="margin">Margin</label>
      <input
        id="margin"
        type="text"
        v-model="marginInput"
        @input="onMarginInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
