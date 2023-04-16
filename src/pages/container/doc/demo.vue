<template>
  <div>
    <z-container>
      <z-header class="header">
        <div>header</div>
      </z-header>
      <z-main> main </z-main>
      <z-footer> footer </z-footer>
    </z-container>
  </div>

  <div>
    <z-container>
      <z-header height="80px">
        <div>header</div>
      </z-header>
      <z-container direction="horizontal">
        <z-aside> aside</z-aside>
        <z-container>
          <z-main> main </z-main>
          <z-footer> footer </z-footer>
        </z-container>
      </z-container>
    </z-container>
  </div>
  <div>
    <z-container direction="horizontal">
      <z-aside> aside</z-aside>
      <z-container>
        <z-header>
          <div>header</div>
        </z-header>
        <z-main> main </z-main>
        <z-footer> footer </z-footer>
      </z-container>
    </z-container>
  </div>
</template>

<style scoped>
div {
  margin: 20px 0;
}
.z-aside,
.z-footer,
.z-header,
.z-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.z-header,
.z-footer {
  background: #d2d2d2;
}
.z-aside {
  background: #d6d6d6;
}
.z-main {
  height: 200px;
  background: #c3e4fc;
}
.z-footer {
  height: 60px;
}
</style>
