// ./components/ExportTree.js
import { inject, watch, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
  name: 'ExportTree',
  setup() {
    const droppedTags = inject('droppedTags');
    const jsonOutput = ref('');

    // Format and update the tree JSON when droppedTags changes
    watch(
      droppedTags,
      (newVal) => {
        jsonOutput.value = JSON.stringify(newVal, null, 2); // pretty print
      },
      { deep: true, immediate: true }
    );

    function copyToClipboard() {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(jsonOutput.value)
            .then(() => alert('JSON copied to clipboard!'))
            .catch((err) => alert('Failed to copy: ' + err));
        } else {
            alert('Clipboard API not available. Please use HTTPS or a local server.');
        }
    }

    return {
      jsonOutput,
      copyToClipboard,
    };
  },
  template: `
    <div style="margin-top: 2rem; background: #222; color: #ddd; padding: 4px;">
      <h3>Export Tree</h3>
      <button @click="copyToClipboard" style="margin-bottom: 1rem; padding: 6px 12px; background: #444; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Copy JSON to Clipboard
      </button>
      <pre style="white-space: pre-wrap; word-break: break-word; font-size: 11px; background: #111; border-radius: 4px;">
{{ jsonOutput }}
      </pre>
    </div>
  `,
};
