<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue"
export default {
  name:'GuluCollapse',
  data(){
    return{
      eventBus:new Vue()
    }
  },
   props:{
    single:{
      type:Boolean,
      default:false
    }
  },
  provide(){
    if(this.single){ //如果需要多选，就不返回eventbus
      return {
        eventBus:this.eventBus
      }
    }

  }
}
</script>
<style lang="scss" scoped>
  $grey:#ddd;
  $border-radius:4px;
  .collapse{
    border:1px solid $grey;
    border-radius: $border-radius;
  }
</style>

