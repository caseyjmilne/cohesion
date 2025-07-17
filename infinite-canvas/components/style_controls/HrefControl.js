import { computed, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'HrefControl',
  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateProps } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    const hrefInput = computed({
      get() {
        return selected.value?.props?.href || '';
      },
      set(value) {
        if (selectedElement.value) {
          updateProps(selectedElement.value, { href: value });
        }
      },
    });

    return {
      selected,
      hrefInput,
    };
  },

  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="href-input">Link Href</label>
      <input
        id="href-input"
        type="text"
        v-model="hrefInput"
        placeholder="https://example.com"
        class="coh-style-control__input"
      />
    </div>
  `,
};
