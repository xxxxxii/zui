<template>
  <div class="z-col" :class="Class">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "zCol",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  col: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
  xs: {
    type: Number,
  },
  sm: {
    type: Number,
  },
  md: {
    type: Number,
  },
  lg: {
    type: Number,
  },
  xl: {
    type: Number,
  },
  offsetXs: {
    type: Number,
  },
  offsetSm: {
    type: Number,
  },
  offsetMd: {
    type: Number,
  },
  offsetLg: {
    type: Number,
  },
  offsetXl: {
    type: Number,
  },
});

const Class = computed(() => {
  return [
    `z-col-${props.col}`,
    props.offset ? `z-col-offset-${props.offset}` : "",
    props.xs ? `z-col-xs-${props.xs}` : "",
    props.sm ? `z-col-sm-${props.sm}` : "",
    props.md ? `z-col-md-${props.md}` : "",
    props.lg ? `z-col-lg-${props.lg}` : "",
    props.xl ? `z-col-xl-${props.xl}` : "",

    props.offsetXs ? `z-col-offset-xs-${props.offsetXs}` : "",
    props.offsetMd ? `z-col-offset-md-${props.offsetMd}` : "",
    props.offsetSm ? `z-col-offset-sm-${props.offsetSm}` : "",
    props.offsetLg ? `z-col-offset-lg-${props.offsetLg}` : "",
    props.offsetXl ? `z-col-offset-xl-${props.offsetXl}` : "",
  ];
});
</script>

<style lang="scss" scoped>
.z-col {
  // display: flex;
  // flex-wrap: wrap;
  // position: relative;
  box-sizing: border-box;
}
@for $n from 1 through 24 {
  .z-col-#{$n} {
    max-width: calc($n/24 * 100%);
    flex-basis: calc($n/24 * 100%);
  }
  .z-col-offset-#{$n} {
    margin-left: calc($n/24 * 100%);
  }
}

@media screen and (max-width: 768px) {
  $class-prefix: z-col-xs-;
  @for $n from 1 through 24 {
    .#{$class-prefix}#{$n} {
      max-width: calc($n/24 * 100%);
      flex-basis: calc($n/24 * 100%);
    }
    .z-col-offset-xs-#{$n} {
      margin-left: calc($n/24 * 100%);
    }
  }
}

@media only screen and (min-width: 768px) {
  $class-prefix: z-col-sm-;
  @for $n from 1 through 24 {
    .#{$class-prefix}#{$n} {
      max-width: calc($n/24 * 100%);
      flex-basis: calc($n/24 * 100%);
    }
    .z-col-offset-sm-#{$n} {
      margin-left: calc($n/24 * 100%);
    }
  }
}

@media only screen and (min-width: 992px) {
  $class-prefix: z-col-md-;
  @for $n from 1 through 24 {
    .#{$class-prefix}#{$n} {
      max-width: calc($n/24 * 100%);
      flex-basis: calc($n/24 * 100%);
    }
    .z-col-offset-md-#{$n} {
      margin-left: calc($n/24 * 100%);
    }
  }
}

@media only screen and (min-width: 1200px) {
  $class-prefix: z-col-lg-;
  @for $n from 1 through 24 {
    .#{$class-prefix}#{$n} {
      max-width: calc($n/24 * 100%);
      flex-basis: calc($n/24 * 100%);
    }
    .z-col-offset-lg-#{$n} {
      margin-left: calc($n/24 * 100%);
    }
  }
}

@media only screen and (min-width: 1920px) {
  $class-prefix: z-col-xl-;
  @for $n from 1 through 24 {
    .#{$class-prefix}#{$n} {
      max-width: calc($n/24 * 100%);
      flex-basis: calc($n/24 * 100%);
    }
    .z-col-offset-xl-#{$n} {
      margin-left: calc($n/24 * 100%);
    }
  }
}
</style>
