<template>
  <div class="popover" @click.stop="onClick"> <!-- 禁止冒泡到document，否则会隐藏两次 -->
    <div ref="contentWrapper" class="content-wrapper"  v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <span ref="trigger">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name:'GuluPopover',
  data(){
    return {visible:false}
  },
  mounted(){
    console.log(this.$refs.trigger)
  },
  methods:{
    onClick(){
      this.visible = !this.visible
      if(this.visible === true){
        this.$nextTick(() => {
          document.body.appendChild(this.$refs.contentWrapper)
          let {width,height,top,left} = this.$refs.trigger.getBoundingClientRect()
          this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
          this.$refs.contentWrapper.style.left = left + window.scrollX +'px'
          let eventHandler = ()=>{
            this.visible = false
            document.removeEventListener('click',eventHandler)
          }
          document.addEventListener('click',eventHandler)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .popover{
    display: inline-block;
    vertical-align: top;
    position: relative;
    border:1px solid green;
  }
  .content-wrapper{
    position: absolute;
    transform: translateY(-100%);
    border:1px solid red;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5)
  }
</style>


