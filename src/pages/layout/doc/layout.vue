<template>
  <div class="container">
    <h2>基础使用:spac</h2>
    <z-row>
      <z-col :col="12"><div class="col-container">1</div></z-col>
      <z-col :col="12"><div class="col-container">2</div></z-col>
      <z-col><div class="col-container">3</div></z-col>
      <z-col><div class="col-container">4</div></z-col>
    </z-row>
  </div>
  <div class="container">
    <h2>间距:spac</h2>
    <z-row :spac="10">
      <z-col :col="12"><div class="col-container"></div></z-col>
      <z-col :col="12"><div class="col-container"></div></z-col>
      <z-col :col="6"><div class="col-container"></div></z-col>
      <z-col :col="6"><div class="col-container"></div></z-col>
      <z-col :col="12"><div class="col-container"></div></z-col>
    </z-row>
    <z-row :spac="20">
      <z-col :col="3"><div class="col-container"></div></z-col>
      <z-col :col="6"><div class="col-container"></div></z-col>
      <z-col :col="3"><div class="col-container"></div></z-col>
      <z-col :col="3"><div class="col-container"></div></z-col>
      <z-col :col="6"><div class="col-container"></div></z-col>
      <z-col :col="3"><div class="col-container"></div></z-col>
    </z-row>
  </div>
  <div class="container">
    <h2>offset</h2>
    <z-row :spac="20">
      <z-col :col="6" :offset="3"><div class="col-container"></div></z-col>
      <z-col :col="3" :offset="1"><div class="col-container"></div></z-col>
      <z-col :col="8" :offset="12"><div class="col-container"></div></z-col>
    </z-row>

    <h2>offset,可设置断点</h2>
    <z-row :spac="20">
      <z-col
        :col="6"
        :offset-xs="1"
        :offset-sm="2"
        :offset-md="3"
        :offset-lg="5"
        ><div class="col-container"></div
      ></z-col>
    </z-row>
  </div>

  <div class="container">
    <h2>layout</h2>
    <z-row :spac="20">
      <z-col :col="6" :xs="24" :sm="20" :md="15" :lg="12" :xl="8"
        ><div class="col-container"></div
      ></z-col>
      <z-col :col="3" :xs="24" :sm="4" :md="9" :lg="12" :xl="16"
        ><div class="col-container"></div
      ></z-col>
    </z-row>
  </div>
</template>

<style scoped lang="scss">
.container-box {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
  .container-content {
    width: 50%;
    flex-basis: 50%;
    padding: 0 10px;
  }
}
.container {
  margin: 10px;
}
.z-col {
  margin-bottom: 5px;
}
.col-container {
  background: #b4b4b4;
  height: 20px;
}
</style>
