import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import StyleHeightControl from '../style_controls/StyleHeightControl.js';
import StyleDisplayControl from '../style_controls/StyleDisplayControl.js';
import StyleBackgroundColorControl from '../style_controls/StyleBackgroundColorControl.js';
import TextContentControl from '../style_controls/TextContentControl.js';
import StyleFontSizeControl from '../style_controls/StyleFontSizeControl.js';
import StyleFontWeightControl from '../style_controls/StyleFontWeightControl.js';
import StyleColorControl from '../style_controls/StyleColorControl.js'; // ✅ NEW IMPORT
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  components: {
    StyleHeightControl,
    StyleDisplayControl,
    StyleBackgroundColorControl,
    TextContentControl,
    StyleFontSizeControl,
    StyleFontWeightControl,
    StyleColorControl, // ✅ REGISTERED
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
    <div id="right-panel" class="coh-side-panel">
      <div v-if="selected">
        <p>Selected: {{ selected.id }}</p>
        <TextContentControl v-if="selected.component === 'text'" />
        <StyleDisplayControl />
        <StyleHeightControl />
        <StyleBackgroundColorControl />
        <StyleFontSizeControl />
        <StyleFontWeightControl />
        <StyleColorControl /> <!-- ✅ ADDED HERE -->
      </div>
      <div v-else>
        No element selected.
      </div>
    </div>
  `,
};
