<template>
  <div
    v-if="show"
    id="context-menu"
    :style="{ top: position.y, left: position.x }"
    @mouseleave="onMouseLeave"
    @contextmenu.prevent
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => {
        return {
          x: "0px",
          y: "0px"
        };
      }
    }
  },

  methods: {
    onMouseLeave() {
      this.$emit("mouseleave");
    }
  }
};
</script>

<style lang="scss" scoped>
#context-menu {
  position: absolute;
  padding: 2px;
}
</style>
