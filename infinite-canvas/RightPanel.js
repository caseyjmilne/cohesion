import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from './composables/useDroppedTags.js';

export default {
  components: {},
  setup() {
    const selectedElement = inject('selectedElement');
    const { droppedTags, findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const heightInput = ref('');

    watch(selected, (newVal) => {
      console.log('selected changed to:', newVal);

      // If selected element has height defined, show it in input
      heightInput.value = newVal?.style?.height || '';
    });

    function onHeightInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'height', value);
      }
    }

    return {
      droppedTags,
      selected,
      heightInput,
      onHeightInput,
    };
  },
  template: `
    <div id="right-panel" style="padding: 1rem; color: white;">
      <div v-if="selected">
        <p>Selected: {{ selected.id }}</p>

        <label for="height">Height:</label>
        <input
          id="height"
          type="text"
          v-model="heightInput"
          @input="onHeightInput"
          placeholder="e.g. 100px or 10rem"
          style="width: 100%; padding: 4px; margin-top: 4px;"
        />
      </div>
      <div v-else>
        No element selected.
      </div>
    </div>
  `,
};
