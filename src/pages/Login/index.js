import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Form } from 'antd';
import React from 'react'
import { Redirect } from 'react-router-dom'
import connect from '../../utils/connect'
import { login } from './service'
import './index.less'
@connect

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }
    handleSubmit() {
        this.formRef.current.validateFields().then(values => {
            this.authChange(values)
        })

        
    }
    authChange = (values) => {
        const { dispatch, authChangeAction } = this.props
        login(values).then(res => {
            const action = authChangeAction(res.data.token)
            dispatch(action)
        })
    }

    render() {
        if (this.props.state.authed || localStorage.getItem('authed')) {
            return (
                <Redirect to="/user" />
            )
        }
        return (
            <div className="flex_center wrapper_login">
                <Form
                    ref={this.formRef}
                    className="login-form login-form-login">
                    <div className="login-title">后台管理系统</div>
                    <Form.Item name='username' rules={[{ required: true, message: "请输入你的用户名" }]}>
                        <Input placeholder='username' prefix={<UserOutlined />}></Input>
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: "请输入你的用户名" }]}>
                        <Input placeholder='password' type='password' prefix={<LockOutlined />}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={() => this.handleSubmit()} className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div className="loginTip">用户为admin的时候，能够看到所有的权限列表，其余账号只能看到部分</div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default NormalLoginForm
