import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../store/index'
import { createPinia } from 'pinia'
import { getToken } from '../config/token'
const userStore = useUserStore(createPinia())

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: () => import('../views/Main.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('../views/home/Home.vue')
                },
                {
                    path: 'home',
                    name: 'Home',
                    component: () => import('../views/home/Home.vue')
                },
                {
                    path: 'goods',
                    name: 'Goods',
                    component: () => import('../views/goods/Goods.vue') 
                },
                {
                    path: 'user',
                    name: 'User',
                    component: () => import('../views/user/User.vue') 
                },
                {
                    path: '/other',
                    children: [
                        {
                            path: 'page1',
                            name: 'Page1',
                            component: () => import('../views/page1/Page1.vue')
                        },
                        {
                            path: 'page2',
                            name: 'Page2',
                            component: () => import('../views/page2/Page2.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/user/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/user/Register.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    let token = getToken()

    if(token) {
        if(to.path === '/login') {
            next({ path: '/' })
        }else {
            next()
        }
    }else {
        if (to.path !== '/login' && to.path !== '/register') {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

export default router