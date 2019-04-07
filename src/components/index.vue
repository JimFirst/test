<template>
    <div class="main">
        <div style="width:300px">
            <el-menu router>
                <el-submenu v-for="(submenus,index) in menus"
                    :index="submenus.name"
                    :key="index">
                    <template slot="title">{{submenus.meta.name}}</template>
                    <el-menu-item v-for="(item, subIndex) in submenus.children" :key="subIndex"
                        :index="submenus.path+'/'+item.path">
                            {{item.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div>
            <div>
                上方导航栏
            </div>
            <div>
                <router-view>
                
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      menus: this.$store.state.permissions.addRoutes
    };
  },
  created() {
  }
};
</script>

<style>
    .main{
        display: flex;
        flex-direction: row;
        height: 100vh;
        border: 1px solid red;
    }
</style>
