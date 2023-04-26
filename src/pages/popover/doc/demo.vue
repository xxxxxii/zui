<template>
  <div class="container">
    <h2>Popover</h2>
    <z-popover placement="top" title="title" content="this is content">
      <z-button>this is button</z-button>
    </z-popover>

    <h2>Popover</h2>
    <z-popover placement="top" title="title" content="this is content">
      <z-button>this is button</z-button>
    </z-popover>

    <h2>Popover click 触发</h2>
    <z-popover
      placement="top"
      title="title"
      content="this is content"
      trigger="click"
    >
      <z-button>this is button</z-button>
    </z-popover>
  </div>
  <div class="container">
    <h2>Popover 自定义内容</h2>
    <z-popover placement="bottom" width="200px" trigger="click">
      <z-button>this is button</z-button>
      <template #content>
        <span>
          <h2>title</h2>
          this is self content
        </span>
      </template>
    </z-popover>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
