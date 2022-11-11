import { defineStore } from 'pinia'
import router from '../router'
import { ElMessage } from 'element-plus'
import { userLogin, userRegister, getCode } from '../api/api'
import {setToken, getToken, removeToken} from '../config/token'


export const useMainStore = defineStore('main', {
    state: () => {
        return {
            isCollapse: false,
            currentMenu: null,
            tabsList: [
                {
                    path: '/',
                    name: 'Home',
                    label: '首页',
                    icon: 'Memo',
                    url: 'Home/Home'
                }
            ]
        }
    },

    actions: {
        // 侧边栏是否折叠
        foldAside() {
            this.isCollapse = !this.isCollapse
        },
        // 改变面包屑
        setCurrentMenu(val) {
            val.name === 'Home' ? (this.currentMenu = null) : (this.currentMenu = val)
        },

        // 设置tag
        setTabsList(val) {
            let isTrue = this.tabsList.findIndex(item => {
                return item.name === val.name
            })
            if(isTrue === -1) {
                this.tabsList.push(val)
            }
        },

        // 关闭tag标签
        closeTab(val,name) {
            if(val.name === this.tabsList[this.tabsList.length - 1].name && val.name === name) {
                this.tabsList = this.tabsList.filter(item => {
                    return item.name !== val.name
                })
                router.push({name: this.tabsList[this.tabsList.length - 1].name})
            }else if(val.name === name){
                let index = this.tabsList.findIndex(item => {
                    return val.name === item.name
                })
                this.tabsList = this.tabsList.filter(item => {
                    return item.name !== val.name
                })
                router.push({name: this.tabsList[index].name})
            }else {
                this.tabsList = this.tabsList.filter(item => {
                    return item.name !== val.name
                })
            }
        }
    }
})



export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: getToken(),
            menu: JSON.parse(localStorage.getItem('menu')) || []
        }
    },

    actions: {
        // 用户登录
        async userLogin(userInfo) {
            let result = await userLogin(userInfo)
            // 报错侧边栏值
            localStorage.setItem('menu', result.data.menu)
            // 当用户登录时赋给侧边栏初始值
            this.menu = JSON.parse(localStorage.getItem('menu'))
            if(result.data.status == 0) {
                // 设置token
                setToken(result.data.token)
                ElMessage({
                    type: 'success',
                    message: result.data.message
                })
                router.push('/home')
            }else {
                ElMessage({
                    type: 'error',
                    message: result.data.message
                })
            }
        },

        // 用户注册
        async userRegister(userInfo) {
            let result = await userRegister(userInfo)
            if(result.data.status == 0) {
                ElMessage({
                    type: 'success',
                    message: result.data.message
                })
                router.push('/login')
            }else {
                ElMessage({
                    type: 'success',
                    message: result.data.message
                })
            }
        },

        // 获取验证码
        async getCode() {
            let code = await getCode()
            return code.data
        },

        // 用户退出登录
        userExit() {
            removeToken()
            localStorage.removeItem('menu')
            this.menu = []
            router.push({name: 'Login'})
        }
    },

    getters: {
        
    }
})