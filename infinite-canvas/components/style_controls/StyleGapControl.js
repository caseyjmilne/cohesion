import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleGapControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const gapInput = ref('');

    watch(selected, (newVal) => {
      gapInput.value = newVal?.style?.gap || '';
    });

    function onGapInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'gap', value);
      }
    }

    return {
      selected,
      gapInput,
      onGapInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="gap">Gap</label>
      <input
        id="gap"
        type="text"
        v-model="gapInput"
        @input="onGapInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
