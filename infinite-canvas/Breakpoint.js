import ElementWrapper from './ElementWrapper.js';

export default {
  components: { ElementWrapper },
  data() {
    return {
      droppedTags: [],
      nextId: 1,
    };
  },
  methods: {
    onDragOver(e) {
      e.preventDefault(); // allow drop
    },
    onDrop(e) {
      e.preventDefault();
      const type = e.dataTransfer.getData('text/plain');
      if (type === 'tag') {
        this.droppedTags.push({
          id: 'tag-' + this.nextId++,
          tag: 'section', // default to <section>
        });
      }
    },
    onElementDrop({ draggedId, targetId }) {
      const fromIndex = this.droppedTags.findIndex(el => el.id === draggedId);
      const toIndex = this.droppedTags.findIndex(el => el.id === targetId);
      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        const [moved] = this.droppedTags.splice(fromIndex, 1);
        this.droppedTags.splice(toIndex, 0, moved);
      }
    },
  },
  template: `
    <div
      class="breakpoint"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <ElementWrapper
        v-for="tag in droppedTags"
        :key="tag.id"
        :id="tag.id"
        :tag="tag.tag"
        @element-drop="onElementDrop"
      />
    </div>
  `,
};
