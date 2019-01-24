<template>
    <div class="hh">
       <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all ref="tree" @check-change="handleCheckChange" node-key="id" ></el-tree>
       <button @click="setCurrentKey(data[1].id)">得得得</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          id: "1",
          children: [
            {
              label: "二级 1-1",
              id: "2",
              children: [
                {
                  label: "三级 1-1-1",
                  id: "3"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          id: "4",
          children: [
            {
              label: "二级 2-1",
              id: "5",
              children: [
                {
                  label: "三级 2-1-1",
                  id: "6"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    setCurrentKey(key) {
      const store = this.$refs.tree.store;
      const node = store.getNode(key);
      store.setCurrentNode(node);
      this.$refs.tree.currentNode = node;
      store.setCurrentNodeKey(key);
      store.currentNodeKey = key;
      this.$refs.tree.$emit("node-click", node.data, node, this.$refs.tree);
    }
  }
};
</script>

<style>
.el-tree-node .is-expanded .is-current .is-focusable {
  border-left: 2px solid solid;
}
</style>
