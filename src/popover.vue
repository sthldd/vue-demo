<template>
  <div class="popover"  ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible"
      :class="{[`position-${position}`]:true}">
      <slot name="content" :close="close"></slot>
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
  props:{
    position:{
      type:String,
      default:'top',
      validator(value){
        return ['top','left','right','bottom'].indexOf(value) >= 0
      }
    },
    trigger:{
      type:String,
      default:'click',
      validator(value){
        return ['click','hover'].indexOf(value) >=0
      }
    }
  },
  computed:{
    openEvent(){
      if(this.trigger === 'click'){
        return 'click'
      }else{
        return 'mouseenter'
      }
    },
    closeEvent(){
      if(this.trigger === 'click'){
        return 'click'
      }else{
        return 'mouseleave'
      }
    },
  },
  mounted(){
    if(this.trigger === 'click'){
      this.$refs.popover.addEventListener('click',this.onClick)
    }else{
       this.$refs.popover.addEventListener('mouseenter',this.open)
       this.$refs.popover.addEventListener('mouseleave',this.close)
    }
  },
   destroyed(){
    if(this.trigger === 'click'){
      this.$refs.popover.removeEventListener('click',this.onClick)
    }else{
      this.$refs.popover.removeEventListener('mouseenter',this.open)
      this.$refs.popover.removeEventListener('mouseleave',this.close)
    }
  },
  methods:{
    positionContent () {
      const {contentWrapper,trigger} = this.$refs
      document.body.appendChild(contentWrapper)
      const {width, height, top, left} = trigger.getBoundingClientRect()
      const {height:height2} = contentWrapper.getBoundingClientRect()
      let positions ={
        top:{
          top:top + window.scrollY,
          left:left + window.scrollX,
        },
        bottom:{
          top:top +height+ window.scrollY,
          left:left + window.scrollX,
        },
        left:{
          top:top +  window.scrollY +(height - height2) / 2,
          left:left + window.scrollX,
        },
        right:{
          top:top +  window.scrollY +(height - height2) / 2,
          left:left +  window.scrollX +width,
        }
      }
      contentWrapper.style.left = positions[this.position].left + 'px'
      contentWrapper.style.top = positions[this.position].top + 'px'

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
    border:1px solid $border-color;
    border-radius: $border-radius;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5)); //倒三角没有阴影
    background: white;
    padding:0.5em 1em;
    max-width: 20em;
    word-break: break-all;
    &::before,&::after{
      content: '';
      display: block;
      height:0px;
      width:0px;
      border:10px solid transparent;
      position: absolute;
    }
    &.position-top{
      transform: translateY(-100%);
      margin-top:-10px;
      &::before,&::after{
        left:10px;
      }
      &::after{
        border-bottom: none;
        top:calc(100% - 1px);
        border-top-color: white;
      }
      &::before{
        border-bottom: none;
        top:100%;
        border-top-color: black;
      }
    }
    &.position-bottom{
      margin-top:10px;
      &::before,&::after{
        left:10px;
      }
      &::before{
        border-top: none;
        bottom:100%;
        border-bottom-color: black;
      }
      &::after{
        border-top: none;
        bottom:calc(100% - 1px);
        border-bottom-color: white;
      }
    }
    &.position-left{
      transform: translateX(-100%);
      margin-left: -10px;
      &::before,&::after{
        top:50%;
        transform: translateY(-50%);
      }
      &::before{
        border-right: none;
        left:100%;
        border-left-color: black;
      }
      &::after{
        border-right: none;
        left:calc(100% - 1px);
        border-left-color: white;
      }
    }
    &.position-right{
      margin-left: 10px;
      &::before,&::after{
        top:50%;
        transform: translateY(-50%);
      }
      &::before{
        border-left: none;
        right:100%;
        border-right-color: black;
      }
      &::after{
        border-left: none;
        right:calc(100% - 1px);
        border-right-color: white;
      }
    }
  }
</style>


