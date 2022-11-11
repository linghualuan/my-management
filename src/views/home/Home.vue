<template>
    <el-row :gutter="20">
        <el-col :span="8" class="elCol">
            <el-card class="box-card" shadow="hover">
                <div class="user">
                    <div class="img">
                        <img src="../../assets/头像.png" alt="" />
                    </div>
                    <div class="user_info">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div>
                <el-divider />
                <div class="login_info">
                    <div class="time">
                        <span class="time_title">上次登录时间</span>
                        <span class="time_date">2022-11-01</span>
                    </div>
                    <div class="address">
                        <span class="address_title">上次登录地点</span>
                        <span class="address_local">武汉</span>
                    </div>
                </div>
            </el-card>

            <el-card class="box-list" shadow="hover">
                <el-table :data="tableData" size="small">
                    <el-table-column v-for="(value, key) in tableInfo" :prop="key" :key="key" :label="value" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" class="r-col">
            <div class="order">
                <el-card 
                    class="r-card"
                    body-style="padding: 0; display: flex;"
                    shadow="hover" 
                    v-for="(item, index) in countData" 
                    :key="index">
                    <div class="icon_img" :style="{background: item.color}">
                        <component class="icons" :is="item.icon"></component>
                    </div>
                    <div class="goods_info">
                        <div class="value">￥{{item.value}}</div>
                        <div class="name">{{item.name}}</div>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 250px;" shadow="hover" body-style="padding: 0">
                <div ref="echart" style="height: 230px;"></div>
            </el-card>
            <div>
                <el-row class="bottom_chart">
                    <el-col :span="12">
                        <el-card shadow="hover" style="height: 230px" body-style="padding: 10px">
                            <div style="height: 210px" ref="userEchart"></div>
                        </el-card>
                    </el-col>
                    <el-col :span="11">
                        <el-card shadow="hover" style="height: 230px" body-style="padding: 0">
                            <div style="height: 230px" ref="videoEchart"></div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</template>

<script setup name="Home">
import { onMounted, ref, getCurrentInstance, reactive } from 'vue'
import { getGoodsSaleData, getCountData, getTableData } from '../../api/api'
import * as echarts from 'echarts'
let tableData = ref([])
let countData = ref([])

const { proxy } = getCurrentInstance() 


onMounted(() => {
    // 获取首页品牌数据
    getTableList()
    // // 获取首页订单数据
    getCountListData()
    // // 获取图表数据
    getEchartData()
})

// 获取商品数据
const getTableList = async () => {
    let result = await getGoodsSaleData()
    tableData.value = result.data
}

// 获取订单数据
const getCountListData = async () => {
    let result = await getCountData()
    countData.value = result.data
}

// // 折线图配置
let xOptions = reactive({
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: []
})

// 饼状图配置
let pieOption = {
    legend: {},
    tooltip: {
        trigger:'item'
    },
    color: [
        '#0f78f4',
        '#dd536b',
        '#9462e5',
        '#a6a6a6',
        '#e1bb22',
        '#39c362',
        '#3ed1cf'
    ],
    series:[]
}

// 订单数据，折线图
let orderData = reactive({
    xData: [],
    series: []
})

// 用户数据，柱状图
let userData = reactive({
    xData: [],
    series: []
})

// 饼状图
let videoData = reactive({
    series: []
})

// 获取图表数据
const getEchartData = async () => {
    let result = await getTableData()
    console.log('图表数据',result)
    // let { orderRes, userRes, videoRes } = result.data.data
    let orderRes = result.data.data.orderData
    let userRes = result.data.data.userData
    let videoRes = result.data.data.videoData

    // // 折线图
    orderData.xData = orderRes.date
    const keyArray = Object.keys(orderRes.data[0])

    const series = []
    keyArray.forEach(key => {
        series.push({
            name: key,
            data: orderRes.data.map(item => item[key]),
            type: 'line'
        })
    })
    orderData.series = series
    xOptions.xAxis.data = orderData.xData
    xOptions.series = orderData.series
    // 渲染折线图
    let hEcharts = echarts.init(proxy.$refs['echart'])
    hEcharts.setOption(xOptions)


    // 柱状图
    userData.xData = userRes.map(item => item.date)
    userData.series = [
        {
            name: '新增用户',
            data: userRes.map(item => item.new),
            type: 'bar'
        },
        {
            name: '活跃用户',
            data: userRes.map(item => item.active),
            type: 'bar'
        }
    ]

    xOptions.xAxis.data = userData.xData
    xOptions.series = userData.series
    let uEcharts = echarts.init(proxy.$refs['userEchart'])
    uEcharts.setOption(xOptions)

    videoData.series = [
        {
            data: videoRes,
            type: 'pie'
        }
    ]

    pieOption.series = videoData.series
    let vEcharts = echarts.init(proxy.$refs['videoEchart'])
    vEcharts.setOption(pieOption)
}



const tableInfo = {
    name: '品牌',
    todayBuy: '今日购买',
    monthBuy: '本月购买',
    totalBuy: '全部购买'
}

</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 10px;
    padding: 0 10px;
    .elCol {
        .box-card {
            margin-bottom: 20px;
            .user {
                display: flex;
                align-items: center;
                .img {
                    flex: 1;
                    img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                .user_info {
                    flex: 3;
                    padding-left: 40px;
                    .name {
                        font-size: 40px;
                    }
                    .role {
                        color: #666;
                    }
                }
            }
            .login_info {
                font-size: 15px;
                color: #666;
                .time {
                    display: flex;
                    margin: 10px 0;
                    .time_title {
                        flex: 1;
                    }
                    .time_date {
                        flex: 2;
                    }
                }
                .address {
                    display: flex;
                    .address_title {
                        flex: 1;
                    }
                    .address_local {
                        flex: 2;
                    }
                }
            }
        }
        
    }
    .r-col {
        
        .order {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .r-card {
                width: 30%;
                height: 70px;
                margin-bottom: 10px;
                align-items: center;
                .icon_img {
                    flex: 1;
                    height: 70px;
                    background-color: aquamarine;
                    .icons {
                        padding: 20px;
                        width: 70px;
                        height: 70px;
                        color: white;
                    }
                }
                .goods_info {
                    flex: 4;
                    height: 70px;
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    .value {
                        flex: 1;
                        font-size: 22px;
                        font-weight: 600;
                    }
                    .name {
                        flex: 1;
                        color: #aaa;
                    }
                }
            }
        }
        .bottom_chart {
            padding: 0;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>