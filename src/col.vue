<template>
  <div class="col" :class="colClass" :style="colStyle">
  <div style="border:1px solid green;height:100px;">
    <slot></slot>
  </div>

  </div>
</template>

<script>
export default {
  name:'GuluCol',
  props:{
    span:{
      type:[Number,String]
    },
    offset:{
      type:[Number,String]
    },
    phone:{
      type:Object,
      validator(value){
        let keys = Object.keys(value)
        let valid = true
        keys.forEach(key => {
          if(!['span','offset'].includes(key)){
            valid = false
          }
        });
      return valid
      }
    }
  },
  data(){
    return{
      gutter:0
    }
  },
  computed:{
    colClass(){
      let {span,offset,phone} = this
      let phoneClass=[]
      if(phone){
        phoneClass=[`col-phone-${phone.span}`]
      }
      return [
        span && `col-${span}`,
        offset && `offset-${offset}`,
        ...phoneClass
      ]
    },
    colStyle(){
      return {
        paddingLeft:this.gutter/2+'px',
        paddingRight:this.gutter/2+'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .col{
    height: 100px;
    width: 50%;

    $class-prefix:col-;
    @for $n from 1 through 24{
      &.#{$class-prefix}#{$n}{
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix:offset-;
    @for $n from 1 through 24{
      &.#{$class-prefix}#{$n}{
        margin-left: ($n / 24) * 100%;
      }
    }
    @media (max-width: 576px) {
      $class-prefix:col-phone-;
        @for $n from 1 through 24{
          &.#{$class-prefix}#{$n}{
            width: ($n / 24) * 100%;
          }
        }
        $class-prefix:offset-phone-;
        @for $n from 1 through 24{
          &.#{$class-prefix}#{$n}{
            margin-left: ($n / 24) * 100%;
          }
        }
    }
  }
</style>
