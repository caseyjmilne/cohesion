// ./components/style_controls/StyleDisplayControl.js
import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleDisplayControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const displayInput = ref('');

    const displayOptions = [
      'block',
      'inline',
      'inline-block',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'none',
    ];

    watch(selected, (newVal) => {
      displayInput.value = newVal?.style?.display || '';
    });

    function onDisplayChange(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        if (value) {
          updateStyle(selectedElement.value, 'display', value);
        } else {
          updateStyle(selectedElement.value, 'display', null); // remove it
        }
      }
    }

    return {
      selected,
      displayInput,
      displayOptions,
      onDisplayChange,
    };
  },
  template: `
    <div v-if="selected" style="margin-top: 1rem;">
      <label for="display">Display:</label>
      <select
        id="display"
        v-model="displayInput"
        @change="onDisplayChange"
        style="width: 100%; padding: 4px; margin-top: 4px;"
      >
        <option value="">-- Unset --</option>
        <option v-for="option in displayOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  `,
};
