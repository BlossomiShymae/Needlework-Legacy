<template>
  <div class="content-card mt2 mb4 pa2 sh1 bdrs2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentCard",
};
</script>

<style lang="scss" scoped>
.content-card {
  background-color: $app-base-card-color;
  width: 98%;
  text-align: left;
}
</style>