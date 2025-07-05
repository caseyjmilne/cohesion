import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import StyleHeightControl from '../style_controls/StyleHeightControl.js';
import StyleDisplayControl from '../style_controls/StyleDisplayControl.js';
import StyleBackgroundColorControl from '../style_controls/StyleBackgroundColorControl.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  components: {
    StyleHeightControl,
    StyleDisplayControl,
    StyleBackgroundColorControl,
  },
  setup() {
    const selectedElement = inject('selectedElement');
    const { droppedTags, findById } = useDroppedTags();
    const selected = computed(() => findById(selectedElement.value));

    return {
      droppedTags,
      selected,
    };
  },
  template: `
    <div id="right-panel" style="padding: 1rem; color: white;">
      <div v-if="selected">
        <p>Selected: {{ selected.id }}</p>
        <StyleDisplayControl />
        <StyleHeightControl />
        <StyleBackgroundColorControl />
      </div>
      <div v-else>
        No element selected.
      </div>
    </div>
  `,
};
