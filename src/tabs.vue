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
    },
    direction:{
      type:String,
      default:'Horizontal',
      vaildator(value){
        return ['Horizontal','Vertical'].indexOf(value) >= 0
      }
    }
  },
  created() {
    // this.$emit('update:selected','xxx')
  },
}
</script>

<style lang="scss" scoped>
.tabs{

}
</style>



