<template>
    <section>
        <div class="norm-steps" >
            <div class="step" v-for="item in childSteps" :key="item.value">
                <div class="top">{{item.name}}</div>
                <div class="line"></div>
                <div class="bottom">{{item.name}}</div>
                <div class="bottom">{{item.name}}</div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data(){
    return {
      childSteps:this.steps
    }
  },
  props:['steps'],
  watch:{
        steps:function(val){
            console.log(val)
            this.$data.childSteps=val;
        }
    }
}
</script>

<style>
    
    .norm-steps{
        position: relative;
        display: flex;
        width: 100%;
        height: 60px;
        border: 1px solid red;
        flex-direction: row;        
    }
    .norm-steps .step{
        border: 1px solid yellow;
        height: 100%;
        flex: 1;
    }
    .norm-steps .line{
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;;
        border-top: 1px solid black;
    }
    .norm-steps .top,.bottom{
        line-height: 20px;
        height: 20px;
        font-size: 12px;
    }
</style>
