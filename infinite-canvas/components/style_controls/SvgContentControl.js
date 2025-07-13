import { computed, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  name: 'SvgContentControl',

  setup() {
    const selectedElement = inject('selectedElement');
    const { findById, updateProps } = useDroppedTags();

    const selected = computed(() => findById(selectedElement.value));

    // Use computed getter/setter instead of ref + watch
    const svgInput = computed({
      get() {
        return selected.value?.props?.svg || '';
      },
      set(value) {
        if (selectedElement.value) {
          updateProps(selectedElement.value, { svg: value });
        }
      },
    });

    return {
      selected,
      svgInput,
    };
  },

  template: `
    <div class="coh-style-control">
      <label class="coh-style-control__label" for="svg-content">SVG Markup</label>
      <textarea
        id="svg-content"
        v-model="svgInput"
        placeholder="<circle cx='25' cy='25' r='20' fill='blue' />"
        style="min-height: 160px; font-family: monospace;"
        class="coh-style-control__input"
      ></textarea>
    </div>
  `,
};
