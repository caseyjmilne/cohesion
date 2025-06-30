<div id="infinite-canvas"></div>

<style>

    html, body {
        margin: 0; padding: 0; height: 100%; overflow: hidden;
    }

    #infinite-canvas {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .canvas-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100000px;
        height: 100000px;
        transform-origin: 0 0;
        background-image:
            linear-gradient(#ddd 1px, transparent 1px),
            linear-gradient(90deg, #ddd 1px, transparent 1px);
        background-size: 40px 40px;
        border: 2px solid red;
    }

    #footer-panel {
      background-color: black;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      height: 60px;
    }

    #header-panel {
      background-color: black;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      height: 40px;
    }

    .breakpoint {
      position: absolute;
      top: 50000px;
      left: 50000px;
      width: 640px;
      height: 800px;
      background-color: rgb(220,220,220);
    }


</style>

<script type="module">
  import { inject, ref, provide, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  import CanvasWrapper from '<?= get_template_directory_uri(); ?>/infinite-canvas/CanvasWrapper.js';
  import FooterPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/FooterPanel.js';
  import HeaderPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/HeaderPanel.js';

  const App = {
    components: { CanvasWrapper, FooterPanel, HeaderPanel },
    setup() {
      const scale = ref(1);
      const setScale = (value) => { scale.value = value; };
      provide('scale', scale);
      provide('setScale', setScale);

      const selectionRect = ref(null);

      // Provide a function to update selectionRect, clearing old selection
      function makeSelection(rect) {
        // Clear previous selection before setting new
        selectionRect.value = null;
        // Next tick or immediately set new rect
        selectionRect.value = rect;
      }
      provide('makeSelection', makeSelection);

      return {
        scale,
        selectionRect,
      };
    },
    template: `
      <div style="position: relative; height: 100vh; width: 100vw;">
        <CanvasWrapper />
        <FooterPanel />
        <HeaderPanel />

        <!-- Global selection overlay -->
        <div
          v-if="selectionRect"
          :style="{
            position: 'fixed',
            top: selectionRect.top + 'px',
            left: selectionRect.left + 'px',
            width: selectionRect.width + 'px',
            height: selectionRect.height + 'px',
            border: '1px solid #4A90E2',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            zIndex: 9999,
          }"
        ></div>
      </div>
    `,
  };

  createApp(App).mount('#infinite-canvas');
</script>
