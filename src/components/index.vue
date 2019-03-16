<template>
    <div class="main">
        <div style="width:300px">
            <el-menu router>
                <el-submenu v-for="submenus in menus"
                    :index="submenus.path"
                    :key="submenus.index">
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
import { asyncRoutes } from "../router/index.js";
export default {
  name: "index",
  data() {
    return {
      menus: asyncRoutes
    };
  },
  created() {
    console.log(111,asyncRoutes);
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
