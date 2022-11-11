/*
环境配置文件
一般在企业级应用中有三个环境
开发环境
线上环境
测试环境
*/

// 获取当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    // 开发环境
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/007e01de132c0e78170a6775bed6ab27/api'
    },
    // 测试环境
    text: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/007e01de132c0e78170a6775bed6ab27/api'
    },
    // 线上环境
    prod: {
        baseApi: '/api',   //真实的后端接口
        mockApi: 'https://www.fastmock.site/mock/007e01de132c0e78170a6775bed6ab27/api'
    }
}

export default {
    env,
    mock: true,
    ...EnvConfig[env]
}