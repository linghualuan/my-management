<template>
    <el-container>
        <el-aside :width="mainStore.isCollapse ? '64px' : '200px'">
            <CommonSide></CommonSide>
        </el-aside>
        <el-container>
            <el-header>
                <ConmonHeader></ConmonHeader>
            </el-header>
            <CommonTab></CommonTab>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup name="Main">
import ConmonHeader from '../components/CommonHeader.vue'
import CommonSide from '../components/ConmonSide.vue'
import CommonTab from '../components/CommonTab.vue' 
import { useMainStore } from '../store'
import { computed } from 'vue';

const mainStore = useMainStore()

</script>

<style>
.el-container {
    height: 100%;
}
.el-header {
    margin: 0;
    padding: 0;
}
.el-main {
    padding: 0;
    margin: 0;
    height: 100%;
}
.el-aside {
    height: 100%;
    background-color: #545c64;
    margin: 0;
    padding: 0;
}
</style>