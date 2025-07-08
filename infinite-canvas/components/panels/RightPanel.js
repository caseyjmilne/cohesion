import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import StyleWidthControl from '../style_controls/StyleWidthControl.js';
import StyleHeightControl from '../style_controls/StyleHeightControl.js';
import StyleFlexBasisControl from '../style_controls/StyleFlexBasisControl.js';
import StyleJustifyContentControl from '../style_controls/StyleJustifyContentControl.js';
import StyleDisplayControl from '../style_controls/StyleDisplayControl.js';
import StylePositionControl from '../style_controls/StylePositionControl.js';
import StyleBackgroundColorControl from '../style_controls/StyleBackgroundColorControl.js';
import StyleBackgroundImageControl from '../style_controls/StyleBackgroundImageControl.js'; // ✅ NEW
import TextContentControl from '../style_controls/TextContentControl.js';
import StyleFontSizeControl from '../style_controls/StyleFontSizeControl.js';
import StyleFontWeightControl from '../style_controls/StyleFontWeightControl.js';
import StyleColorControl from '../style_controls/StyleColorControl.js';
import StyleFontFamilyControl from '../style_controls/StyleFontFamilyControl.js';
import StyleGapControl from '../style_controls/StyleGapControl.js';
import StylePaddingControl from '../style_controls/StylePaddingControl.js';
import StyleMarginControl from '../style_controls/StyleMarginControl.js';
import PanelSection from './PanelSection.js';
import { useDroppedTags } from '../../composables/useDroppedTags.js';

export default {
  components: {
    StyleWidthControl,
    StyleHeightControl,
    StyleFlexBasisControl,
    StyleJustifyContentControl,
    StyleDisplayControl,
    StylePositionControl,
    StyleBackgroundColorControl,
    StyleBackgroundImageControl, // ✅ REGISTERED
    TextContentControl,
    StyleFontSizeControl,
    StyleFontWeightControl,
    StyleColorControl,
    StyleFontFamilyControl,
    StyleGapControl,
    StylePaddingControl,
    StyleMarginControl,
    PanelSection,
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
        <p style="font-size: 10px; font-weight: 500;">{{ selected.id }}</p>
        <TextContentControl v-if="selected.component === 'text'" />

        <PanelSection label="Layout">
          <StyleDisplayControl />
          <StylePositionControl />
        </PanelSection>

        <PanelSection label="Sizing">
          <StyleWidthControl />
          <StyleHeightControl />
        </PanelSection>

        <PanelSection label="Flexbox">
          <StyleFlexBasisControl />
          <StyleJustifyContentControl />
        </PanelSection>

        <PanelSection label="Background">
          <StyleBackgroundColorControl />
          <StyleBackgroundImageControl />
        </PanelSection>

        <PanelSection label="Spacing">
          <StyleGapControl />
          <StylePaddingControl />
          <StyleMarginControl />
        </PanelSection>

        <PanelSection label="Typography">
          <StyleFontSizeControl />
          <StyleFontWeightControl />
          <StyleColorControl />
          <StyleFontFamilyControl />
        </PanelSection>
      </div>
      <div v-else>
        No element selected.
      </div>
    </div>
  `,
};
