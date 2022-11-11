<template>
    <div class="container">
        <div class="l-content">
            <el-button size="small" @click="clickIconHome">
                <el-icon><Fold /></el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }"><span style="color: white">首页</span></el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: currentMenu.path}" v-if="currentMenu"><span style="color: white">{{currentMenu.label}}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="userAvatar" :src="getAvatar()" alt="">
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>
                        <span @click="userExit">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup name="CommonHeader">
import { useMainStore, useUserStore } from '../store'
import { computed } from '@vue/reactivity';
// 动态引入图片
const getAvatar = () => {
    return new URL('../assets/头像.png', import.meta.url).href
}

const mainStore = useMainStore()
const userStore = useUserStore()

const clickIconHome = () => {
    mainStore.foldAside()
}

const currentMenu = computed(() => mainStore.currentMenu || '')


const userExit = () => {
    userStore.userExit()
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    background-color: #6699CC;
    padding: 0 20px;

    .r-content {
        .userAvatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        .title {
            margin-left: 10px;
        }
        .bread {
            margin-left: 10px;
            display: flex;
            color: white;
            align-items: center;
            .el-breadcrumb-item {
                cursor: pointer;
            }
        }
    }
}

</style>