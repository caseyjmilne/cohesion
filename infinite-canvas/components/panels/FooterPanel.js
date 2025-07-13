import Element from '../user_components/Element.js';
import Text from '../user_components/Text.js';
import Svg from '../user_components/Svg.js';

export default {
  name: 'FooterPanel',
  components: {
    Element,
    Text,
    Svg,
  },
  template: `
    <div id="footer-panel">
      <Element label="TAG" type="tag" />
      <Text />
      <Svg />
    </div>
  `,
};
