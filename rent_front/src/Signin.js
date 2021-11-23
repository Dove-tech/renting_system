import { Form, Input, Checkbox, Button, Modal, message } from 'antd';
import React, { useState, Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor(props) {
        super(props);
    }

    onFinish = (values) => {
        console.log("values", values);
        const signinInfo = { name: values.username, password: values.password };
        // this.setState({signupInfo: {name: values.username, password: values.password}}, () => {
        console.log(signinInfo);
        axios.post('/pillow/user-signin/', signinInfo).then((res) => {
            console.log("res", res);
            if (res.data.response.error === 'OK') {
                message.info("You've signed in successfully!");
                window.localStorage.setItem("user",res.data.response.id)
            } else {
                message.error("Password is not correct");
            }
        });
        // });
    }

    render() {
        return (
            <>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>

            </>
        )
    }
}

export default Signin;