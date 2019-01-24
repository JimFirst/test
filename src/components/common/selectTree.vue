<template>
    <div class="select-tree" ref="selectTree" :value="testValue" v-clickoutside="selectTreeBlur">
        <el-input  readonly class="ipt-tree" :placeholder="placeholder" v-model="treeLable" @focus="showTrees"></el-input>
        <div v-show="showTree" ref="trees" class="trees">
            <el-input
                v-show="filter"
                class="tree-filter"
                placeholder="关键词搜索"
                v-model="filterText">
            </el-input>
            <el-tree
                ref="dataTree"
                :filter-node-method="filterNode"
                :default-expand-all='true'
                :data="dataTree"
                :expand-on-click-node='false'
                :props="innerTreeProps"
                :node-key="innerTreeProps.id"
                highlight-current
                @node-click="handleNodeClick">
            </el-tree>
        </div>
    </div>
</template>

<script>
import {clickoutside,setPosition} from '../../utils/regular.js';
export default {
    name:'selectTree',
    directives: {clickoutside},
    model: {
      props: 'value',
      event: 'change'
    },
    props:{
        value:{
            type:String,
            default:function(){
                return this.treeValue
            }
        },
        dataTree: {
            type: Array,
            default: function () {
                return []
            }
        },
        placeholder: {
            type: String,
            default: function () {
                return '请选择'
            }
        },
        treeProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        filter:{
            type:Boolean,
            default:function(){
                return true
            }
        }
    },
    data(){
        return {
            filterText:'',
            showTree:false,
            treeLable:null,
            treeValue:null
        }
    },
    computed: {
        innerTreeProps () {
            return Object.assign({
                id: 'id',
                label: 'label',
                children: 'children'
            }, this.treeProps)
        },
        testValue:{
            get:function(){
                return this.value
            },
            set:function(val){
                this.$emit('change',val)
            }
        }
    },
    watch:{
        filterText(val){
            this.$refs.dataTree.filter(val)
        },
        value(newVal,oldVal){
            if(newVal==undefined||newVal==''){
                this.$refs.dataTree.setCurrentKey(null);
                this.treeLable=''
            }
            this.$emit('change',newVal)
        }
    },
    methods:{
        // 显示下拉树
        showTrees(){
            this.$data.showTree=true;
            this.filterText='';
            setPosition(this.$refs.selectTree,this.$refs.trees)
        },
        // 失焦收起
        selectTreeBlur(){
            this.$data.showTree=false;
        },
        // 下拉树点击方法
        handleNodeClick(data, node, treeNode){
            this.$emit('node-click', data, node, treeNode);
            this.treeLable=node.label;
            this.treeValue=node.key;
            this.$data.showTree=false;
            this.$emit('change',this.treeValue)
        },
        // 树过滤
        filterNode(value, data) {
            if (!value) return true;
            return data[this.innerTreeProps.label].indexOf(value) !== -1;
        },
    },
    mounted(){
    }
}
</script>

<style>
@import "../../styles/order/select-tree.css";
</style>
