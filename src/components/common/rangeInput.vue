<template>
    <div class="content" v-clickoutside="hanldeBlur">
        <input v-model="iptOne" @focus="handleFocus" @input="handleIpt" @change="oneChange" onkeyup="value=value.replace(/[^0-9.]/g,'')" :placeholder="placeholderOne" :type="type">
        <span>{{to}}</span>
        <input v-model="iptTwo" @focus="handleFocus" @input="handleIpt" @change="twoChange" onkeyup="value=value.replace(/[^0-9.]/g,'')" :placeholder="placeholderTwo" :type="type">
        <div v-show="clearable&&showClear" @click="clearContent" class="clearIcon">
            <i class="el-icon-error"></i>
        </div>
    </div>
</template>

<script>
import {clickoutside} from '../../utils/regular.js';
export default {
    name:'rangeInput',
    data(){
        return {
            showClear:false
        }
    },
    model: {
      props: 'value',
      event: 'input'
    },
    computed:{
        iptOne:{
            get:function(){
                if(this.value!=undefined){
                    return this.value[0]
                }else{
                    return ''
                }
            },
            set(val){
                this.$emit('input',[val,this.value[1]])
            }
        },
        iptTwo:{
            get:function(){
                if(this.value!=undefined){
                    return this.value[1]
                }else{
                    return ''
                }
                
            },
            set(val){
                this.$emit('input',[this.value[0],val])
            }
        }
    },
    directives: {clickoutside},
    props:{
        clearable:{
            type:Boolean,
            default:function(){
                return true
            }
        },
        placeholderOne:{
            type:String,
            default:'最小值'
        },
        placeholderTwo:{
            type:String,
            default:'最大值'
        },
        value:{
            type:Array,
            default:function(){
                return new Array(2)
            } 
        },
        type:{
            type:String,
            default:'text'
        },
        to:{
            type:String,
            default:'~'
        }
    },
    methods:{
        onlyNum(){

        },
        handleFocus(e){
            this.showClearBtn(e.target.value);
        },
        hanldeBlur(){
            this.showClear=false;
        },
        handleIpt(e){
            this.showClearBtn(e.data);
        },
        clearContent(){
            this.showClear=false;
            this.$emit('input',new Array(2))
        },
        showClearBtn(value){
            if(value!=''&&value!=undefined){
                this.showClear=true;
            }else{
                this.showClear=false;
            }
        },
        oneChange(e){
            let value=parseFloat(e.target.value);
            if(value>parseFloat(this.iptTwo)){
                this.$emit('input',[this.iptTwo,this.iptTwo])
            }
        },
        twoChange(e){
            let value=parseFloat(e.target.value);
            if(value<parseFloat(this.iptOne)){
                this.$emit('input',[this.iptOne,this.iptOne])
            }
        }
    }
}
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .content{
        position: relative;
        border: 1px solid #999;
        height: 28px;
        line-height: 28px;
        padding: 0 16px;
    }
    input{
        display: inline-block;
        border: none;
        width: 45%;
        outline: none;
        padding: 0 16px;
    }
    .clearIcon{
        position: absolute;
        right: 8px;
        top: 1px;
        cursor: pointer;
    }
    .clearIcon .el-icon-error{
        color: #c0c4cc;
        font-size: 13px;
        display: inline-block;
    }
</style>

