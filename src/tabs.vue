<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'GuluTabs',
  props:{
    selected:{
      type:String,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs{

}
</style>



