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
    },
    selected:{
      type:String
    }
  },
  provide(){
    return {
      eventBus:this.eventBus
    }
  },
  mounted(){
    this.eventBus.$emit('updata:selected',this.selected)
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

