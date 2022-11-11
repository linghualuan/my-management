import request from './request'

// export default {
//     // 获取首页品牌数据
//     getTableData() {
//         return request({
//             url: '/home/getData',
//             method: 'get',
//             mock: true
//         })
//     },

//     // 获取首页订单数据
//     getCountData() {
//         return request({
//             url: '/home/getTableList',
//             method: 'get',
//             mock: true
//         })
//     },

//     getEchartData() {
//         return request({
//             url: '/home/getEchartsData',
//             method: 'get',
//             mock: true
//         })
//     },

//     // 获取用户数据
//     getUserData(params) {
//         return request({
//             url: '/user/getUser',
//             method: 'GET',
//             data: params,
//             mock: false
//         })
//     },

//     // 添加用户
//     addUser(params) {
//         return request({
//             url: '/user/addUser',
//             method: 'POST',
//             data: params,
//             mock: false
//         })
//     },

//     // 修改用户信息
//     editUser(params) {
//         return request({
//             url: '/user/editUser',
//             method: 'POST',
//             data: params,
//             mock: false
//         })
//     },

//     // 删除用户
//     deteleUser(params) {
//         return request({
//             url: '/user/deteleUser',
//             method: 'POST',
//             data: params,
//             mock: false
//         })
//     },
// }

// 用户登录
export const userLogin = (params) => {
    return request({
        url: '/api/login',
        method: 'POST',
        data: params
    })
}

// 用户注册
export const userRegister = (params) => {
    return request({
        url: '/api/reguser',
        method: 'POST',
        data: params
    })
}

// 获取验证码
export const getCode = () => {
    return request({
        url: '/api/code',
        method: 'POST'
    })
}

// 获取用户列表信息
export const getUserListData = (params) => {
    return request({
        url: '/my/getUserList',
        method: 'POST',
        data: params
    })
}

// 根据id删除用户
export const deleteUserById = (id) => {
    return request({
        url: `/my/deleteUser/${id}`,
        method: 'delete'
    })
}

// 修改用户信息
export const updateUserInfo = (params) => {
    return request({
        url: '/my/updateUserListInfo',
        method: 'POST',
        data: params
    })
}

// 搜索用户信息
export const searchInfo = (params) => {
    return request({
        url: '/my/searchInfo',
        method: 'POST',
        data: params
    })
}

// 新增用户
export const addUser = (params) => {
    return request({
        url: '/my/addNewUser',
        method: 'POST',
        data: params
    })
}

// 获取商品销售数据
export const getGoodsSaleData = () => {
    return request({
        url: '/my/getGoodSaleData',
        method: 'GET'
    })
}

// 获取订单数据
export const getCountData = () => {
    return request({
        url: '/my/getCountData',
        method: 'GET'
    })
}


// 获取图表数据
export const getTableData = () => {
    return request({
        url: '/my/getTableData',
        method: 'GET'
    })
}