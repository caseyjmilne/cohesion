import Element from '../user_components/Element.js';
import Text from '../user_components/Text.js';
import Svg from '../user_components/Svg.js';
import Anchor from '../user_components/Anchor.js';

export default {
  name: 'FooterPanel',
  components: {
    Element,
    Text,
    Svg,
    Anchor,
  },
  template: `
    <div id="footer-panel">
      <Element label="TAG" type="tag" />
      <Text />
      <Svg />
      <Anchor />
    </div>
  `,
};
