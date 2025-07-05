import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'TextContentControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateProps } = useDroppedTags(); // Ensure this method exists
    const selected = computed(() => findById(selectedElement.value));

    const textInput = ref('');

    watch(selected, (newVal) => {
      textInput.value = newVal?.props?.text || '';
    });

    function onTextInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateProps(selectedElement.value, { text: value });
      }
    }

    return {
      selected,
      textInput,
      onTextInput,
    };
  },
  template: `
    <div v-if="selected">
      <label for="text-content">Text Content:</label>
      <textarea
        id="text-content"
        v-model="textInput"
        @input="onTextInput"
        placeholder="Enter text..."
        style="width: 100%; padding: 4px; margin-top: 4px; min-height: 80px;"
      ></textarea>
    </div>
  `,
};
