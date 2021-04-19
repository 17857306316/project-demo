import React from 'react'
import { Card, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

export default function Home() {
    return (
        <div style={{background:'#f0f2f5'}}>
            <Card title="工作台" >
                <div style={{ display: 'flex' }}>
                    <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" size={64} icon={<UserOutlined />} />
                    <div style={{marginLeft:10}}>
                        <div style={{fontSize:'16px'}}>你好，<strong>admin</strong>祝你开心每一天!</div>
                        <div style={{opacity:'0.5',marginTop:10}} > 管理员</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}