import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleJustifyContentControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const justifyInput = ref('');

    const justifyOptions = [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ];

    watch(selected, (newVal) => {
      justifyInput.value = newVal?.style?.justifyContent || '';
    });

    function onJustifyChange(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'justifyContent', value || null);
      }
    }

    return {
      justifyInput,
      justifyOptions,
      onJustifyChange,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="justify">Justify Content</label>
      <select
        id="justify"
        v-model="justifyInput"
        @change="onJustifyChange"
        class="coh-style-control__input"
      >
        <option value=""></option>
        <option v-for="option in justifyOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  `,
};
