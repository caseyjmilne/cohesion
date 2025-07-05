import Element from '../user_components/Element.js';
import Text from '../user_components/Text.js';

export default {
  name: 'FooterPanel',
  components: {
    Element,
    Text,
  },
  template: `
    <div id="footer-panel">
      <Element label="TAG" type="tag" />
      <Text />
    </div>
  `,
};
