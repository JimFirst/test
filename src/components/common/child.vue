<template>
    <section>
        <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        >
        <button>{{demo}}</button>
        <p>test:{{this.childTest}}</p>
        <input type="text" v-model="ipt.value1">
        <input type="text" v-model="ipt.value2">
    </section>
</template>
<script>
export default {
    data(){
        return {
            demo:this.value,
            ipt:{
                value1:''
            },
            childTest:this.test
        }
    },
    props:{
        value:{
            type:String
        },
        test:{
            type:Boolean,
            default:false  
        }
    },
    methods:{
        set(val){
            this.$data.ipt.value1=val
        }
    },
    watch:{
        test:function(val){
            console.log(val)
            this.$data.childTest=val;
        }
    }
}
</script>
<style>

</style>


