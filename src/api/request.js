import axios from 'axios'
// import config from '../config'
import { ElMessage } from 'element-plus'
import { getToken } from '../config/token'

const NETWORK_ERROR = '网络请求异常, 请重试'

const service = axios.create({
    baseURL: 'http://localhost:81',
    timeout: 5000
})

service.interceptors.request.use(config => {
    let token = getToken()
    if(token) {
        config.headers.Authorization = token
    }
    return config
})


service.interceptors.response.use(res => {
    return res
    // const { code, data, message } = res.data
    // if(code === 200) {
    //     return data
    // }else {
    //     // 网络请求错误
    //     ElMessage.error(message || NETWORK_ERROR)
    //     return Promise.reject(message || NETWORK_ERROR)
    // }
})


// 封装的核心函数
// function request(options) {
//     options.method = options.method || 'get'
//     if(options.method.toLowerCase() == 'get') {
//         options.params = options.data
//     }

//     // 对mock的处理
//     let isMock = config.isMock
//     if(typeof options.mock !== 'undefined') {
//         isMock = options.mock
//     }

//     // 对线上环境的处理
//     if(config.env == 'prod') {
//         // 强制不能使用mock数据
//         service.defaults.baseURL = config.baseApi
//     }else {
//         service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
//     }

//     return service(options)
// }

export default service