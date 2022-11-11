<template>
    <div class="container">
        <div class="login_form">
            <div class="user_back">
                <img src="../../assets/互动娱乐.png" alt="">
            </div>
            <div class="user_form">
                <h3>登录</h3>
                <el-form :model="userInfo">
                    <el-form-item class="username">
                        <el-input placeholder="请输入用户名" v-model="userInfo.username" type="text">
                            <template #prefix>
                                <span class="iconfont icon-tianjiayonghutianchong username_icon"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="password">
                        <el-input placeholder="请输入密码" v-model="userInfo.password" type="password">
                            <template #prefix>
                                <span class="iconfont icon-icon2 password_icon"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="code">
                        <el-row :gutter="20">
                            <el-col :span="16">
                                <span class="iconfont icon-yanzhengma1 code_icon"></span>
                                <el-input placeholder="验证码" v-model="userInfo.code"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <div v-html="codeImg" @click="getNewCode"></div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item class="login">
                        <el-button class="login_btn" type="primary" @click="userLogin">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <router-link to="/register">没有账号?去注册</router-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script name="Login" setup>
import { reactive, onMounted, ref } from 'vue';
import { useUserStore } from '../../store/index'

// 用户名，密码，验证码
const userInfo = reactive({
    username: '',
    password: '',
    code: ''
})

// 验证码数据,渲染到页面上
const codeImg = ref('')

const userStore = useUserStore()

onMounted(async () => {
    // 首次加载获取验证码
    let code = await userStore.getCode()
    codeImg.value = code
})

// 点击验证码更换
const getNewCode = async () => {
    let code = await userStore.getCode()
    codeImg.value = code
}

// 用户登录
const userLogin = async () => {
    userStore.userLogin(userInfo)
}

</script>

<style lang="scss" scoped>
.container {
    background-image:url('../../assets/back.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .login_form {
        width: 1000px;
        height: 500px;
        // margin: 0 auto;
        background-color: white;
        display: flex;
        border-radius: 20px;
        .user_back {
            flex: 3;
            height: 500px;
            display: flex;
            align-items: center;
            img {
                width: 100%;
                height: 70%;
                margin: 0 auto;
            }
        }
        .user_form {
            flex: 2;
            padding: 60px;
            box-sizing: border-box;
            h3 {
                text-align: center;
                font-size: 30px;
                margin: 30px 0;
            }
            a {
                text-decoration: none;
            }
            .username {
                position: relative;
                :deep(input) {
                    padding-left: 12px;
                }
                .username_icon {
                    position: absolute;
                    z-index: 100;
                    margin-left: 10px;
                }
                
            }
            .password {
                position: relative;
                :deep(input) {
                    padding-left: 12px;
                }
                .password_icon {
                    position: absolute;
                    z-index: 100;
                    margin-left: 10px;
                }
            }
            .code {
                position: relative;
                width: 100%;
                img {
                    width: 100%;
                    height: 50px;
                }
                :deep(input) {
                    padding-left: 12px;
                }
                .code_icon {
                    position: absolute;
                    z-index: 100;
                    margin-left: 5px;
                    color: #aaa;
                }
            }
            .login {
                width: 100%;

                .login_btn {
width: 100%;
                }
            }
        }
    }
}
</style>