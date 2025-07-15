import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleTopControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const topInput = ref('');

    watch(selected, (newVal) => {
      topInput.value = newVal?.style?.top || '';
    });

    function onTopInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'top', value);
      }
    }

    return {
      selected,
      topInput,
      onTopInput,
    };
  },

  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="top">Top</label>
      <input
        id="top"
        type="text"
        v-model="topInput"
        @input="onTopInput"
        class="coh-style-control__input"
      />
    </div>
  `,
};
