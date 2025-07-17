<?php 
  show_admin_bar(false);
  get_header(); 
?>

<div id="infinite-canvas"></div>

<script type="module">
  import { inject, ref, provide, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  import CanvasWrapper from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/CanvasWrapper.js';
  import FooterPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/FooterPanel.js';
  import HeaderPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/HeaderPanel.js';
  import LeftPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/LeftPanel.js';
  import RightPanel from '<?= get_template_directory_uri(); ?>/infinite-canvas/components/panels/RightPanel.js';

  const App = {
    components: { CanvasWrapper, FooterPanel, HeaderPanel, LeftPanel, RightPanel },
    setup() {
      const droppedTags = ref([]);

      provide('droppedTags', droppedTags);

      watch(droppedTags, (newVal) => {
        const json = JSON.stringify(newVal);

        // Save remotely
        fetch('/wp-json/cohesion/v1/editor-save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            editor_content: json,
          }),
        })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to save remotely');
          return res.json();
        })
        .then((data) => {
          console.log('[Editor] Saved to server:', data);
        })
        .catch((err) => {
          console.warn('[Editor] Remote save failed:', err.message);
        });
      }, { deep: true });

      const scale = ref(1);
      const setScale = (value) => { scale.value = value; };
      provide('scale', scale);
      provide('setScale', setScale);

      const selectionRect = ref(null);
      const selectedElement = ref(null);

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
