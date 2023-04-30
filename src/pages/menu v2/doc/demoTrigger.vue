<template>
  <div>
    <h2>menu v2 菜单触发方式 trigger 默认："hover" "click"</h2>
    trigger="hover"
    <z-nav-menu mode="horizontal" trigger="hover">
      <z-sub-menu title="导航一" icon="icon-tongzhan">
        <z-menu-item-group title="分组一">
          <z-menu-item> 选项1 </z-menu-item>
          <z-menu-item> 选项2 </z-menu-item>
          <z-menu-item> 选项3 </z-menu-item>
          <z-sub-menu title="导航二">
            <z-menu-item> 选项1 </z-menu-item>
            <z-menu-item> 选项2 </z-menu-item>
            <z-menu-item> 选项3 </z-menu-item>
          </z-sub-menu>
        </z-menu-item-group>
      </z-sub-menu>
      <z-menu-item> 导航三 </z-menu-item>
      <z-menu-item> 导航四 </z-menu-item>
    </z-nav-menu>
    trigger="click"
    <z-nav-menu mode="horizontal">
      <z-sub-menu title="导航一">
        <z-menu-item-group title="分组一">
          <z-menu-item> 选项1 </z-menu-item>
          <z-menu-item> 选项2 </z-menu-item>
          <z-menu-item> 选项3 </z-menu-item>
          <z-sub-menu title="导航二">
            <z-menu-item> 选项1 </z-menu-item>
            <z-menu-item> 选项2 </z-menu-item>
            <z-menu-item> 选项3 </z-menu-item>
          </z-sub-menu>
        </z-menu-item-group>
      </z-sub-menu>
      <z-menu-item> 导航三 </z-menu-item>
      <z-menu-item> 导航四 </z-menu-item>
    </z-nav-menu>
  </div>
  <div>
    <h2>menu v2 hover</h2>
    trigger="hover"
    <z-nav-menu trigger="hover">
      <z-sub-menu title="导航一">
        <z-menu-item-group>
          <template #title>
            <span> 分组一 </span>
          </template>
          <z-menu-item> 选项1 </z-menu-item>
          <z-menu-item> 选项2 </z-menu-item>
          <z-menu-item> 选项3 </z-menu-item>
        </z-menu-item-group>
        <z-sub-menu title="导航二">
          <z-menu-item> 选项1 </z-menu-item>
          <z-menu-item> 选项2 </z-menu-item>
          <z-menu-item> 选项3 </z-menu-item>
        </z-sub-menu>
      </z-sub-menu>
      <z-menu-item> 导航三 </z-menu-item>
      <z-menu-item> 导航四 </z-menu-item>
    </z-nav-menu>
    trigger="clcik"
    <z-nav-menu>
      <z-sub-menu title="导航一">
        <z-menu-item-group>
          <template #title>
            <span> 分组一 </span>
          </template>
          <z-menu-item> 选项1 </z-menu-item>
          <z-menu-item> 选项2 </z-menu-item>
          <z-menu-item> 选项3 </z-menu-item>
        </z-menu-item-group>
        <z-sub-menu title="导航二">
          <z-menu-item> 选项1 </z-menu-item>
          <z-menu-item> 选项2 </z-menu-item>
          <z-menu-item> 选项3 </z-menu-item>
        </z-sub-menu>
      </z-sub-menu>
      <z-menu-item> 导航三 </z-menu-item>
      <z-menu-item> 导航四 </z-menu-item>
    </z-nav-menu>
  </div>
</template>
