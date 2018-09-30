<template>
  <div class="popover" @click="onClick" ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <span ref="trigger" style="display:inline-block">
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
  methods:{
    positionContent () {
        document.body.appendChild(this.$refs.contentWrapper)
        let {width, height, top, left} = this.$refs.trigger.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
      },
    onClickDocument (e) {
      if (this.$refs.popover &&(this.$refs.popover === e.target || this.$refs.popover.contains(e.target))){ return }
      if (this.$refs.contentWrapper &&(this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))){ return }
      this.close()
      },
    open () {
      this.visible = true
      this.$nextTick(() => {
        this.positionContent()
        document.addEventListener('click', this.onClickDocument)
      })
    },
    close () {
      this.visible = false
      document.removeEventListener('click', this.onClickDocument)
    },
    onClick (event) {
        if (this.$refs.trigger.contains(event.target)) {
          if (this.visible === true) {
            this.close()
          } else {
            this.open()
          }
        }
       }
    }
  }
</script>
<style lang="scss" scoped>
  $border-color:#333;
  $border-radius:4px;
  .popover{
    display: inline-block;
    vertical-align: top;
    position: relative;

  }
  .content-wrapper{
    position: absolute;
    transform: translateY(-100%);
    border:1px solid $border-color;
    border-radius: $border-radius;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5)); //倒三角没有阴影
    background: white;
    padding:0.5em 1em;
    margin-top:-10px;
    max-width: 20em;
    word-break: break-all;
    &::before,&::after{
      content: '';
      display: block;
      height:0px;
      width:0px;
      border:10px solid transparent;
      position: absolute;
      left:10px;
      top:100%;
      border-top-color: black;
    }
    &::after{
      top:calc(100% - 1px);
      border-top-color: white;
    }
    &::before{
      top:100%;
      border-top-color: black;
    }
  }
</style>


