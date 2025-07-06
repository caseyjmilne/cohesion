import ExportTree from '../ExportTree.js';
import Layers from '../Layers.js';

export default {
  components: {
    ExportTree,
    Layers,
  },
  template: `
    <div id="left-panel" style="padding: 1rem;">
      <Layers />
      <ExportTree />
    </div>
  `,
};
