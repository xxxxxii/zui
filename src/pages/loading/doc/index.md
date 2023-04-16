# Loading 组件
<script setup>
  import demo from "./demo.vue"
  import demoDirectivers from "./demoDirectivers.vue"
  import demoMountDom from "./demoMountDom.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="loading" vueFName="demo" />

<demoDirectivers />
<pre-view compName="loading" vueFName="demoDirectivers" />

<demoMountDom />
<pre-view compName="loading" vueFName="demoMountDom" />
