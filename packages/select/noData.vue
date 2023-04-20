<template>
  <div class="no-data">No Data</div>
</template>

<style scoped lang="scss">
.no-data {
  font-size: 12px;
  text-align: center;
  color: rgba($color: $light-color, $alpha: 0.8);
}
html.dark {
  .no-data {
    color: rgba($color: $dark-color, $alpha: 0.8);
  }
}
</style>
