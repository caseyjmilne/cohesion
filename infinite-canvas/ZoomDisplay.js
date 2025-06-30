import { inject, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    setup() {
        const scale = inject('scale');
        const zoomPercentage = computed(() => `${Math.round(scale.value * 100)}%`);
        return { zoomPercentage };
    },
    template: `
        <div id="zoom-display" style="color: white;">{{zoomPercentage}}</div>
    `, 
}