import Mock from 'mockjs'
// 导入数据
import homeData from './mockData/home'
import userData from './mockData/user'
// 接口
Mock.mock('/home/getData', homeData.getHomeData)
// 用户数据
Mock.mock(/api\/user\/getUser/, userData.getUserList)
// 添加用户
Mock.mock(/api\/user\/addUser/,'post', userData.createUser)
// 修改用户
Mock.mock(/api\/user\/editUser/,'post', userData.updateUser)
// 删除用户
Mock.mock(/api\/user\/deteleUser/,'post', userData.deleteUser)