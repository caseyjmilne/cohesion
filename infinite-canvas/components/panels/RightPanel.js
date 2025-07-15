import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import StyleWidthControl from '../style_controls/StyleWidthControl.js';
import StyleHeightControl from '../style_controls/StyleHeightControl.js';
import StyleFlexBasisControl from '../style_controls/StyleFlexBasisControl.js';
import StyleJustifyContentControl from '../style_controls/StyleJustifyContentControl.js';
import StyleAlignItemsControl from '../style_controls/StyleAlignItemsControl.js';
import StyleDisplayControl from '../style_controls/StyleDisplayControl.js';
import StylePositionControl from '../style_controls/StylePositionControl.js';
import StyleLeftControl from '../style_controls/StyleLeftControl.js';
import StyleRightControl from '../style_controls/StyleRightControl.js';
import StyleTopControl from '../style_controls/StyleTopControl.js';       // ✅ NEW
import StyleBottomControl from '../style_controls/StyleBottomControl.js'; // ✅ NEW
import StyleBackgroundColorControl from '../style_controls/StyleBackgroundColorControl.js';
import StyleBackgroundImageControl from '../style_controls/StyleBackgroundImageControl.js';
import TextContentControl from '../style_controls/TextContentControl.js';
import SvgContentControl from '../style_controls/SvgContentControl.js';
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
    StyleAlignItemsControl,
    StyleDisplayControl,
    StylePositionControl,
    StyleLeftControl,
    StyleRightControl,
    StyleTopControl,       // ✅ REGISTERED
    StyleBottomControl,    // ✅ REGISTERED
    StyleBackgroundColorControl,
    StyleBackgroundImageControl,
    TextContentControl,
    SvgContentControl,
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

        <!-- Content Controls -->
        <TextContentControl v-if="selected.component === 'text'" />
        <SvgContentControl v-if="selected.component === 'svg'" />

        <PanelSection label="Layout">
          <StyleDisplayControl />
        </PanelSection>

        <PanelSection label="Position">
          <StylePositionControl />
          <StyleTopControl />
          <StyleBottomControl />
          <StyleLeftControl />
          <StyleRightControl />
        </PanelSection>

        <PanelSection label="Sizing">
          <StyleWidthControl />
          <StyleHeightControl />
        </PanelSection>

        <PanelSection label="Flexbox">
          <StyleFlexBasisControl />
          <StyleJustifyContentControl />
          <StyleAlignItemsControl />
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
