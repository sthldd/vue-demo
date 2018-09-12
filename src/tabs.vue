<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  name:'GuluTabs',
  props:{
    selected:{
      type:String,
      required:true
    },
    direction:{
      type:String,
      default:'Horizontal',
      vaildator(value){
        return ['Horizontal','Vertical'].indexOf(value) >= 0
      }
    }
  },
  data(){
    return {
      eventBus :new Vue()
    }
  },
  provide(){
    return {
      eventBus:this.eventBus
    }
  },
  created() {

  },
}
</script>

<style lang="scss" scoped>
.tabs{

}
</style>



