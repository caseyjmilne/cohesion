import { inject, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import Breakpoint from './Breakpoint.js';

export default {
  components: { Breakpoint },
  props: ['selectionRect'],
  setup(props) {
    const scale = inject('scale');
    const setScale = inject('setScale');

    const offsetX = ref(0);
    const offsetY = ref(0);
    const isPanning = ref(false);
    const panStartX = ref(0);
    const panStartY = ref(0);
    const draggingDot = ref(null);
    const dragStartX = ref(0);
    const dragStartY = ref(0);

    const baseWidth = 100000;
    const baseHeight = 100000;

    const canvasContent = ref(null);
    const droppedTags = ref([]);

    const contentStyle = computed(() => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: baseWidth + 'px',
      height: baseHeight + 'px',
      transform: `translate(calc(-50% + ${offsetX.value}px), calc(-50% + ${offsetY.value}px)) scale(${scale.value})`,
      transformOrigin: '0 0',
      backgroundImage: `
        linear-gradient(#ddd 1px, transparent 1px),
        linear-gradient(90deg, #ddd 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }));

    function startPan(e) {
      if (e.target !== canvasContent.value) return;
      isPanning.value = true;
      panStartX.value = e.clientX - offsetX.value;
      panStartY.value = e.clientY - offsetY.value;
    }

    function onPan(e) {
      if (isPanning.value) {
        offsetX.value = e.clientX - panStartX.value;
        offsetY.value = e.clientY - panStartY.value;
      } else if (draggingDot.value) {
        const dx = (e.clientX - dragStartX.value) / scale.value;
        const dy = (e.clientY - dragStartY.value) / scale.value;

        draggingDot.value.x += dx;
        draggingDot.value.y += dy;

        dragStartX.value = e.clientX;
        dragStartY.value = e.clientY;
      }
    }

    function endPan() {
      isPanning.value = false;
      draggingDot.value = null;
    }

    function onZoom(e) {
      const zoomStep = -e.deltaY / 1000;
      const newScale = scale.value + zoomStep;
      const clamped = Math.min(Math.max(0.25, newScale), 8);
      applyScale(clamped, e.clientX, e.clientY);
    }

    function applyScale(newScale, mouseX, mouseY) {
      const oldScale = scale.value;
      const deltaScale = newScale - oldScale;

      const delta = 0.5 * baseWidth * deltaScale;
      let newOffsetX = offsetX.value - delta;
      let newOffsetY = offsetY.value - delta;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const factor = 1.5;

      const shiftX = (mouseX - centerX) * (1 - newScale / oldScale) * factor;
      const shiftY = (mouseY - centerY) * (1 - newScale / oldScale) * factor;

      newOffsetX += shiftX;
      newOffsetY += shiftY;

      setScale(newScale);
      offsetX.value = newOffsetX;
      offsetY.value = newOffsetY;
    }

    function startDrag(dot, e) {
      draggingDot.value = dot;
      dragStartX.value = e.clientX;
      dragStartY.value = e.clientY;
    }

    function onDragOver(e) {
      e.preventDefault(); // required to allow dropping
    }

    function onDrop(e) {
      e.preventDefault();
      const type = e.dataTransfer.getData('text/plain');
      if (type !== 'tag') return;

      // Insert a tag centered at 50000x, 50000y (canvas center)
      droppedTags.value.push({
        id: Date.now()
      });
    }

    return {
      canvasContent,
      offsetX,
      offsetY,
      contentStyle,
      onZoom,
      onPan,
      endPan,
      startPan,
      startDrag,
      scale,
      droppedTags,
      onDragOver,
      onDrop,
      selectionRect: computed(() => props.selectionRect), // make reactive if needed
    };
  },
  template: `
    <div
      class="canvas-content"
      ref="canvasContent"
      :style="contentStyle"
      @mousedown="startPan"
      @mousemove="onPan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @wheel.prevent="onZoom"
      @dragover.prevent="onDragOver"
      @drop="onDrop"
    >
      <Breakpoint />
      <!-- Global selection overlay -->
      <div
        v-if="selectionRect"
        :style="{
          position: 'absolute',
          top: selectionRect.top + 'px',
          left: selectionRect.left + 'px',
          width: selectionRect.width + 'px',
          height: selectionRect.height + 'px',
          border: '5px solid #4A90E2',
          zIndex: 9999,
        }"
      ></div>
    </div>
  `,
};
