import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleFlexBasisControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const flexBasisInput = ref('');

    watch(selected, (newVal) => {
      flexBasisInput.value = newVal?.style?.flexBasis || '';
    });

    function onFlexBasisInput(e) {
      const value = e.target.value;

      console.log('flexBasis input value')
      console.log(value)

      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'flexBasis', value);
      }
    }

    return {
      selected,
      flexBasisInput,
      onFlexBasisInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="flex-basis">Flex Basis</label>
      <input
        id="flex-basis"
        type="text"
        v-model="flexBasisInput"
        @input="onFlexBasisInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
