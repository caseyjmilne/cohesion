import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleAlignItemsControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const alignInput = ref('');

    const alignOptions = [
      'stretch',
      'flex-start',
      'flex-end',
      'center',
      'baseline',
    ];

    watch(selected, (newVal) => {
      alignInput.value = newVal?.style?.alignItems || '';
    });

    function onAlignChange(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'alignItems', value || null);
      }
    }

    return {
      alignInput,
      alignOptions,
      onAlignChange,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="align-items">Align Items</label>
      <select
        id="align-items"
        v-model="alignInput"
        @change="onAlignChange"
        class="coh-style-control__input"
      >
        <option value=""></option>
        <option v-for="option in alignOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  `,
};
