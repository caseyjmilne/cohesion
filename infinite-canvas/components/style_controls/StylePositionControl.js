import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StylePositionControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const positionInput = ref('');

    const positionOptions = [
      'static',
      'relative',
      'absolute',
      'fixed',
      'sticky',
    ];

    watch(selected, (newVal) => {
      positionInput.value = newVal?.style?.position || '';
    });

    function onPositionChange(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        if (value) {
          updateStyle(selectedElement.value, 'position', value);
        } else {
          updateStyle(selectedElement.value, 'position', null); // remove it
        }
      }
    }

    return {
      selected,
      positionInput,
      positionOptions,
      onPositionChange,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="position">Position</label>
      <select
        id="position"
        v-model="positionInput"
        @change="onPositionChange"
        class="coh-style-control__input"
      >
        <option value=""></option>
        <option v-for="option in positionOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  `,
};
