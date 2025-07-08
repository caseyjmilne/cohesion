import { computed, inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'StyleBackgroundImageControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateStyle } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const bgImageInput = ref('');

    watch(selected, (newVal) => {
      bgImageInput.value = newVal?.style?.backgroundImage || '';
    });

    function onBgImageInput(e) {
      const value = e.target.value;
      if (selectedElement.value) {
        updateStyle(selectedElement.value, 'backgroundImage', value || null);
      }
    }

    return {
      selected,
      bgImageInput,
      onBgImageInput,
    };
  },
  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="bg-image">Background Image</label>
      <input
        id="bg-image"
        type="text"
        v-model="bgImageInput"
        @input="onBgImageInput"
        placeholder="e.g. url('https://example.com/bg.jpg')"
        class="coh-style-control__input"
      />
    </div>
  `,
};
