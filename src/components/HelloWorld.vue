<template>
    <div class="hh">
      <range-input v-model="test" @input="handleInput" @change="change"></range-input>
    </div>
</template>

<script>
export default {
  data() {
    return {
      test:[]
    };
  },
  methods: {
    change(val){
      console.log(11,val,this.test)
    },
    handleInput(val){
      console.log(22,val,this.test)
    }
  }
};
</script>

<style>
  .hh{
    width: 240px;
  }
</style>
