<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
        :collapse="mainStore.isCollapse" :collapse-transition="false" text-color="#fff">
        <h3 class="mb-2">{{ mainStore.isCollapse ? '后台' : '后台管理系统' }}</h3>
        <el-menu-item v-for="item in noChildren()" :index="item.path" :key="item.path" @click="handleRoute(item)">
            <component class="icons" :is="item.icon"></component>
            <span class="label">{{ item.label }}</span>
        </el-menu-item>

        <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
            <template #title>
                <component class="icons" :is="item.icon"></component>
                <span class='label'>{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <el-menu-item :index="subItem.path" @click="handleRoute(subItem)">
                    <component class="icons" :is="subItem.icon"></component>
                    <span class="label">{{ subItem.label }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script setup name="CommonSide">
import { useMainStore, useUserStore } from '../store'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
// const menu = [
//     {
//         path: '/',
//         name: 'Home',
//         label: '首页',
//         icon: 'Memo',
//         url: 'Home/Home'
//     },
//     {
//         path: '/goods',
//         name: 'Goods',
//         label: '商品管理',
//         icon: 'Orange',
//         url: 'MallManage/MallManage'
//     },
//     {
//         path: '/user',
//         name: 'User',
//         label: '用户管理',
//         icon: 'User',
//         url: 'UserManage/UserManage'
//     },
//     {
//         label: '其他',
//         icon: 'MoreFilled',
//         path: '/other',
//         children: [
//             {
//                 path: '/other/page1',
//                 name: 'Page1',
//                 label: '其他1',
//                 icon: 'Orange',
//                 url: 'Other/PageOne'
//             },
//             {
//                 path: '/other/page2',
//                 name: 'Page2',
//                 label: '其他2',
//                 icon: 'Orange',
//                 url: 'Other/PageTwo'
//             }
//         ]
//     }
// ]

const userStore = useUserStore()
const mainStore = useMainStore()
const router = useRouter()


let menu = ref([])
menu = computed(() => {
    return userStore.menu
})

const noChildren = () => {
    return menu.value.filter(item => !item.children)
}

const hasChildren = () => {
    return menu.value.filter(item => item.children)
}

const handleRoute = (item) => {
    router.push({ name: item.name })
    // 改变面包屑
    mainStore.setCurrentMenu(item)

    // 设置tag
    mainStore.setTabsList(item)
}
</script>

<style lang="scss" scoped>
.icons {
    width: 16px;
    height: 16px;
    color: #fff;
    margin: 0;
}

.label {
    margin-left: 10px;
}

.el-menu {
    // 去掉右侧空隙
    border-right: none;
    height: 100%;

    h3 {
        color: white;
        text-align: center;
        // margin-top: 10px;
        padding-top: 10px;
    }
}
</style>