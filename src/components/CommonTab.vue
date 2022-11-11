<template>
    <div class="tab">
        <el-tag
            v-for="(item, index) in tabsList"
            :key="index"
            :effect="route.name == item.name ? 'dark' : 'plain'"
            :closable="item.name !== 'Home'"
            @close="closeTab(item)"
            @click="goTheRouter(item)"
        >{{item.label}}</el-tag>
    </div>
</template>

<script setup name="CommonTab" >
import { computed } from '@vue/reactivity';
import { useMainStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
const mainStore = useMainStore()
const router = useRouter()
const route = useRoute()
const tabsList = computed(() => mainStore.tabsList || '')


const closeTab = (item) => {
    mainStore.closeTab(item,route.name)
}

const goTheRouter = (item) => {
    router.push({name: item.name})
}


</script>

<style lang="scss" scoped>
.tab {
    padding: 10px;
    padding-bottom: 0; 
    .el-tag {
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>