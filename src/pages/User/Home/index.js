import React, { useEffect } from 'react'
import { Card, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';

export default function Home() {

    useEffect(() => {
        getEcharts()
    }, [])

    function getEcharts() {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                name: '订单完成情况',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
            }]
        });
    }
    return (
        <div style={{ background: '#f0f2f5' }}>
            <Card title="工作台" style={{marginBottom:10}}>
                <div style={{ display: 'flex' }}>
                    <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" size={64} icon={<UserOutlined />} />
                    <div style={{ marginLeft: 10 }}>
                        <div style={{ fontSize: '16px' }}>你好，<strong>admin</strong>祝你开心每一天!</div>
                        <div style={{ opacity: '0.5', marginTop: 10 }} > 管理员</div>
                    </div>
                </div>
            </Card >
            <Card title='订单完成数'>
            <div id='main' style={{ width: '100%', height: 400 }}>
            </div>
            </Card>
        </div>
    )
}