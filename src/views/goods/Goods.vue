<template>
    <div class="container">
        <div class="con_list">
            <div class="item" ref="echart1"></div>
        </div>
        <div class="con_list">
            <div class="item" ref="echart2"></div>
        </div>
        <div class="con_list">
            <div class="item" ref="echart3"></div>
        </div>
        <div class="con_list">
            <div class="item" ref="echart4"></div>
        </div>
    </div>
</template>

<script setup name="Goods">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance()

// option1----------------------------------------------------------
var xData = [
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
];
var data = {
    bqs: [95284.5, 110640.25, 88141.5, 111738.25, 27134.25, 0, 0, 0, 0, 0],
    hbl: [15, 17, -20, 27, -75, -100, 100, 100, 100, 100],
    sqs: [83108.5, 95284.5, 110640.25, 88141.5, 111738.25, 27134.25, 0, 0, 0, 0],
    tbl: [248, 98, 66, 53, -63, -100, -100, -100, -100, -100],
    tqs: [27425, 55983.25, 53158, 73186, 74439.75, 86922.75, 107109.25, 102578.5, 126522.25, 123338.75],
};
let series = [];
if (proxy.showTip == 'year') {
    series = [
        {
            type: 'bar',
            name: '今年',
            yAxisIndex: 0,
            itemStyle: {
                color: '#1EF37D',
                barBorderRadius: [12, 12, 0, 0],
            },
            barWidth: 16,
            data: data.bqs,
        },
        {
            name: '同比',
            yAxisIndex: 1,
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#973e77',
                    },
                    {
                        offset: 1,
                        color: '#462a86',
                    },
                ]),
            },
            data: data.tbl,
            symbolSize: 8,
        },
    ];
} else {
    series = [
        {
            type: 'bar',
            name: '今年',
            yAxisIndex: 0,
            itemStyle: {
                color: '#1EF37D',
                barBorderRadius: [12, 12, 0, 0],
            },
            barWidth: 16,
            data: data.bqs,
        },
        {
            type: 'bar',
            name: '去年',
            yAxisIndex: 0,
            itemStyle: {
                color: '#fee725',
                barBorderRadius: [12, 12, 0, 0],
            },
            barWidth: 16,
            data: data.tqs,
        },
        {
            name: '同比',
            yAxisIndex: 1,
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#973e77',
                    },
                    {
                        offset: 1,
                        color: '#462a86',
                    },
                ]),
            },
            data: data.tbl,
            symbolSize: 8,
        },
        {
            name: '环比',
            yAxisIndex: 1,
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#119cca',
                    },
                    {
                        offset: 1,
                        color: '#09399c',
                    },
                ]),
            },
            data: data.hbl,
            symbolSize: 8,
        },
    ];
}
let option1 = {
    backgroundColor:'blurScope',
    color: ['#ff5561', '#00d0fd'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
        textStyle: {
            color: '#CFE3FC',
        },
        borderWidth: 1,
        formatter: (params) => {
            let str = '';
            if (proxy.showTip == 'year') {
                str = `<div>
                 <div>
                   <p style="font-size: 14px;color:#1EF37D">今年${data.bqs[params[0].dataIndex]} TEU</p>
                   <p style="font-size: 14px;color:#FF5561">同比${params[1].value}%</p>
                 </div>
                 </div>`;
            } else {
                str = `<div>  
                 <div>
                   <p style="font-size: 14px;color:#1EF37D">今年${data.bqs[params[0].dataIndex]} TEU</p>
                   <p style="font-size: 14px;color:#09F3F8">环比${params[3].value}%</p>
                   <p style="font-size: 14px;color:#FF5561">同比${params[2].value}%</p>
                 </div>
                 </div>`;
            }
            return str;
        },
    },
    legend: {
        // icon: "circle",
        top: '8%',
        selectedMode: false,
        left: 'center',
        itemWidth: 16,
        itemHeight: 10,
        textStyle: {
            color: '#fff',
        },
        itemGap: 50,
    },
    grid: {
        left: '20px',
        right: '20px',
        top: '20%',
        bottom: '20px',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            axisTick: {
                show: false,
            },
            data: xData,
            axisLine: {
                lineStyle: {
                    color: '#fff',
                },
                onZero: false,
            },
            axisLabel: {
                interval: 0,
                color: '#fff',
                fontSize: 16,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#FFF',
                },
                symbol: ['none', 'arrow'],
                symbolSize: [5, 12],
                symbolOffset: [0, 10],
            },
            axisLabel: {
                interval: 0,
                color: '#fff',
                fontSize: 16,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(39, 57, 75, 1)',
                    width: 1,
                    type: 'solid',
                },
            },
        },
        {
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(207, 227, 252, 1)t',
                },
                symbol: ['none', 'arrow'],
                symbolSize: [5, 12],
                symbolOffset: [0, 10],
            },
            axisLabel: {
                interval: 0,
                color: function (value) {
                    if (value > 0) {
                        return '#00FCF9';
                    } else if (value < 0) {
                        return '#FF4E00';
                    } else {
                        return '#fff';
                    }
                },
                formatter: '{value} %',
                fontSize: 16,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(39, 57, 75, 1)',
                    width: 1,
                    type: 'solid',
                },
            },
        },
    ],
    series: series,
}


// option2----------------------------------------------------------
var demoData = [
    { name: 'CNC-1', value: 220, unit: '', pos: ['16.6%', '25%'] },
    { name: 'CNC-2', value: 32, unit: '', pos: ['49.8%', '25%'] },
    { name: 'CNC-3', value: 0.9, pos: ['83%', '25%'] },
    { name: 'CNC-4', value: 6.34, unit: '', pos: ['16.6%', '75%'] },
    { name: 'CNC-5', value: 6.28, unit: '', pos: ['49.8%', '75%'] },
    { name: 'CNC-6', value: 50, unit: '', pos: ['83%', '75%'] },
];

// 统计百分比
var data1 = [14,15,65,24,75,23,24,43,27,72,12,53];
var data2 = [45,65,24,74,75,23,42,54,13,32,52,13];
var json = {
    chart0: {
        xcategory: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        low: data1,
        lowLine: [],
    }
};
var json2 = {
    chart0: {
        xcategory: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        low: data2,
        lowLine: [],
    }
};
var datacoords = [{
    coords: []
}]
var datacoords2 = [{
    coords: []
}]
for (var i = 0; i < json.chart0.xcategory.length; i++) {
    datacoords[0].coords.push(
    [json.chart0.xcategory[i], data1[i]]
    )
}
for (var i = 0; i < json.chart0.xcategory.length; i++) {
    datacoords2[0].coords.push(
    [json2.chart0.xcategory[i], data2[i]])
}

let option2 = {
        backgroundColor: '#03060F',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#15ecf4'
            }
        },
        backgroundColor: 'rgba(0,0,0,.8)',
        extraCssText: 'box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);',
        formatter: function(params) {
            var result = params[0].name + '<br>';
            params.forEach(function(item) {
                result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
                // 判断设置增长还是降低
                if (parseFloat(item.data) >= 50) {
                    result += item.seriesName + ": " + '<span class="growth">增长' + item.data + "%</span><br>"
                } else if (parseFloat(item.data) < 50) {
                    result += item.seriesName + ": " + '<span class="reduce">降低' + item.data + "%</span><br>"
                }
            });
            return result;
        }
    },
    legend: {
        data: ['同比', '环比'],
        textStyle: {
            fontSize: 12,
            color: 'rgb(0,253,255,0.6)'
        },
        top: '5%',
        right: '5%'
    },
    grid: {
        bottom: 50,
        left: 70,
        right: 50,
    },
    xAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: '#15faff',
            },

        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    yAxis: {
        max: 100,
        splitNumber: 4,
        interval: 25,
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#4b4d64'
            }
        },
        axisLabel: {
            formatter: '{value} %',
            textStyle: { //改变刻度字体样式
                color: '#ffffff'
            }
        },
    },
    series: [{
            name: '环比',
            type: 'line',
            // smooth: true,
            symbol: 'none',
            symbolSize: 10,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 204,1, .9)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(6, 8, 41,.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffcb00'
                }
            },
            data: data1
        },
        {
            name: '环比',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            zlevel: 1,
            polyline: true,
            smooth: true,
            symbol: 'circle',
            effect: {
                show: true,
                trailLength: 0.4,
                symbol: "circle",
                period: 8, //光点滑动速度
                symbolSize: 8,
            },
            lineStyle: {
                normal: {
                    color: '#ffcb00',
                    width: 0,
                    opacity: 0,
                    curveness: 0,
                }
            },
            data: datacoords
        },
        {
            name: '同比',
            type: 'line',
            // smooth: true,
            symbol: 'none',
            symbolSize: 10,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(21, 250, 255,.9)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(6, 8, 41,.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#15faff'
                }
            },
            data: data2
        },
        {
            name: '同比',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            zlevel: 1,
            smooth: true,
            polyline: true,
            symbol: 'circle',
            effect: {
                show: true,
                trailLength: 0.4,
                symbol: "circle",
                period: 8, //光点滑动速度
                symbolSize: 8,
            },
            lineStyle: {
                normal: {
                    color: '#15faff',
                    width: 0,
                    opacity: 0,
                    curveness: 0,
                }
            },
            data: datacoords2
        },
    ]
};


// option3----------------------------------------------------------
var value = 0.75;
var data = [value, 0.3, 0.4];
let option3 = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
            offset: 0,
            color: '#431ab8',
        },
        {
            offset: 1,
            color: '#471bba',
        },
    ]),
    title: {
        text: (value*100)+'%',
        textStyle: {
            fontSize: 36,
            fontWeight: 'normal',
            color: '#fff',
        },
        x: 'center',
        y: 'center',
    },
    graphic: [
        {
            type: 'group',
            left: 'center',
            top: '60%',
            children: [
                {
                    type: 'text',
                    z: 100,
                    left: '10',
                    top: 'middle',
                    style: {
                        fill: '#aab2fa',
                        text: '流量统计',
                        font: '20px Microsoft YaHei',
                    },
                },
            ],
        },
    ],
    series: [
        {
            type: 'liquidFill',
            radius: '80%',
            center: ['50%', '50%'],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
                color: {
                    type: 'linear',
                    x: 1,
                    y: 0,
                    x2: 0.5,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 1,
                            color: 'rgba(68, 145, 253, 0)',
                        },
                        {
                            offset: 0.5,
                            color: 'rgba(68, 145, 253, .25)',
                        },
                        {
                            offset: 0,
                            color: 'rgba(68, 145, 253, 1)',
                        },
                    ],
                    globalCoord: false,
                },
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 20,
                    borderColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(69, 73, 240, 0)',
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(69, 73, 240, .25)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(69, 73, 240, 1)',
                            },
                        ],
                        globalCoord: false,
                    },
                    shadowBlur: 10,
                    shadowColor: '#000',
                },
            },
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 1,
                        color: 'rgba(58, 71, 212, 0)',
                    },
                    {
                        offset: 0.5,
                        color: 'rgba(31, 222, 225, .2)',
                    },
                    {
                        offset: 0,
                        color: 'rgba(31, 222, 225, 1)',
                    },
                ],
                globalCoord: false,
            },
            label: {
                normal: {
                    formatter: '',
                },
            },
        },
        {
            type: 'pie',
            zlevel: 0,
            silent: true,
            center: ['50%', '50%'],
            radius: ['80%', '85%'],
            hoverAnimation: false,
            color: '#245b8f',
            label: {
                normal: {
                    show: false,
                },
            },
            labelLine: {
                normal: {
                    show: false,
                },
            },
            data: [1],
        },
        {
            type: 'pie',
            zlevel: 10,
            silent: true,
            center: ['50%', '50%'],
            radius: ['80%', '85%'],
            startAngle: 50,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                },
            },
            labelLine: {
                normal: {
                    show: false,
                },
            },
            data: _pie2(),
        },
    ],
};

function _pie2() {
    let dataArr = [];
    for (var i = 0; i < 8; i++) {
        if (i % 2 === 0) {
            dataArr.push({
                name: (i + 1).toString(),
                value: 50,
                itemStyle: {
                    normal: {
                        color: '#6dc9fe',
                    },
                },
            });
        } else {
            dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)',
                    },
                },
            });
        }
    }
    return dataArr;
}


// option4------------------------------------------
var currvalue = 450;
var maxValue = 4000;
var title = '收入比重';

var percent = (currvalue / maxValue * 100).toFixed(2);
var bl = maxValue / 100;
let option4 = {
    backgroundColor: '#010e28',
    series: [{
            name: '刻度',
            type: 'gauge',
            radius: '80%',
            center: ['50%', '70%'],
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 190,
            endAngle: -10,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: [
                        [1, 'rgba(0,0,0,0)']
                    ]
                }
            }, //仪表盘轴线
            axisLabel: {
                show: true,
                color: '#4c647c',
                distance: 30,
                formatter: function(v) {
                    switch (v + '') {
                        case '0':
                            return '0';
                        case '12.5':
                            return 12.5 * bl;
                        case '25':
                            return 25 * bl;
                        case '37.5':
                            return 37.5 * bl;
                        case '50':
                            return 50 * bl;
                        case '62.5':
                            return 62.5 * bl;
                        case '75':
                            return 75 * bl;
                        case '87.5':
                            return 87.5 * bl;
                        case '100':
                            return 100 * bl;
                    }
                }
            }, //刻度标签。
            axisTick: {
                show: true,
                splitNumber: 10,
                lineStyle: {
                    color: '#4c647c',
                    width: 1,
                },
                length: -8
            }, //刻度样式
            splitLine: {
                show: true,
                length: -20,
                lineStyle: {
                    color: '#4c647c'
                }
            }, //分隔线样式
            detail: {
                show: false
            },
            pointer: {
                show: false
            }
        },
        {

            name: '税收比重',
            type: 'gauge',
            radius: '98%',
            center: ['50%', '70%'],

            splitNumber: 0, //刻度数量
            startAngle: 190,
            endAngle: -10,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 5,
                    color: [
                        [
                            1, new echarts.graphic.LinearGradient(
                                0, 0, 1, 0, [{
                                        offset: 0,
                                        color: '#4e6be3'
                                    },
                                    {
                                        offset: 1,
                                        color: '#23b4f9'
                                    }
                                ]
                            )
                        ]
                    ]
                }
            },
            //分隔线样式。
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            pointer: {
                show: false
            },
            title: {
                show: true,
                offsetCenter: [0, '40%'], // x, y，单位px
                textStyle: {
                    color: '#73f3f5', //标题颜色
                    fontSize: 32
                }
            },
            //仪表盘详情，用于显示数据。
            detail: {
                show: true,
                offsetCenter: [0, 0],
                color: '#d5b16f', //指标值颜色
                formatter: function(params) {
                    // var params = params.toFixed(2)
                    return params + '%'

                },
                textStyle: {
                    fontSize: 48
                }
            },
            data: [{
                name: title,
                value: percent
            }]
        },
        {
            type: 'pie',
            radius: ["79%", "91%"],
            center: ['50%', '70%'],
            animation: false,
            label: {
                show: false,
            },
            startAngle: 190 - (percent / 100) * 200 + 1.5,
            color: ['#d5b16f', 'rgba(0,0,0,0)'],
            itemStyle: {
                shadowColor: '#d5b16f',
                shadowBlur: 15,
            },
            data: [{
                value: 3,
                name: "指针"
            }, {
                value: 357,
                name: "空白"
            }],
        }, {
            type: 'pie',
            radius: ["50%", "51%"],
            center: ['50%', '70%'],
            animation: false,
            label: {
                show: false,
            },
            startAngle: 200,
            itemStyle: {
                shadowColor: '#73f3f5', //中心渐变颜色
                shadowBlur: 30,
            },
            data: [{
                value: 220,
                name: "指针",
                itemStyle: {
                    color: '#010e28'
                }
            }, {
                value: 140,
                name: "空白",
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            }],
        }
    ]
};





onMounted(() => {
    let echart1 = echarts.init(proxy.$refs['echart1'])
    echart1.setOption(option1)

    let echart2 = echarts.init(proxy.$refs['echart2'])
    echart2.setOption(option2)

    let echart3 = echarts.init(proxy.$refs['echart3'])
    echart3.setOption(option3)

    let echart4 = echarts.init(proxy.$refs['echart4'])
    echart4.setOption(option4)
})
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .con_list {
        width: 48%;
        height: 48%;
        margin-left: 10px;
        margin-top: 10px;
        border-radius: 5px;
        .item {
            width: 100%;
            height: 100%;
            background-color: black;
        }
    }
}
</style>