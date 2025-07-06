<?php 
  show_admin_bar(false);
  get_header(); 
?>

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

    #left-panel {
      background-color: black;
      position: fixed;
      top: 40px;
      bottom: 60px;
      left: 0;
      width: 200px;
      overflow-y: auto;
    }

    #right-panel {
      background-color: black;
      position: fixed;
      top: 40px;
      bottom: 60px;
      right: 0;
      width: 200px;
      color: white;
      overflow-y: auto;
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
  import FooterPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/FooterPanel.js';
  import HeaderPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/HeaderPanel.js';
  import LeftPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/LeftPanel.js';
  import RightPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/RightPanel.js';

  const App = {
    components: { CanvasWrapper, FooterPanel, HeaderPanel, LeftPanel, RightPanel },
    setup() {

      const droppedTags = ref([]); // initialize with an empty array
      provide('droppedTags', droppedTags); // make it available to all descendants

      const scale = ref(1);
      const setScale = (value) => { scale.value = value; };
      provide('scale', scale);
      provide('setScale', setScale);

      const selectionRect = ref(null);
      const selectedElement = ref(null);

      // Provide a function to update selectionRect, clearing old selection
      function makeSelection(elementId, rect) {
        const canvasContent = document.querySelector('.canvas-content');
        const canvasRect = canvasContent.getBoundingClientRect();
        const currentScale = scale.value;

        const box = {
          top: (rect.top - canvasRect.top) / currentScale - 5,
          left: (rect.left - canvasRect.left) / currentScale - 5,
          width: rect.width / currentScale,
          height: (rect.height / currentScale) * 0.5,
        };

        selectionRect.value = null;
        selectionRect.value = box;

        // Set selected element by ID. 
        selectedElement.value = elementId;
      }

      provide('selectedElement', selectedElement);
      provide('makeSelection', makeSelection);

      return {
        scale,
        selectionRect,
      };
    },
    template: `
      <div style="position: relative; height: 100vh; width: 100vw;">
        <CanvasWrapper :selectionRect="selectionRect" />
        <FooterPanel />
        <HeaderPanel />
        <LeftPanel />
        <RightPanel />
      </div>
    `,
  };

  createApp(App).mount('#infinite-canvas');
</script>

<?php get_footer(); ?>
