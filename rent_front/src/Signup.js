import { Form, Input, Button, PageHeader, message } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupInfo: {
                name: '',
                password: ''
            }
        }
    }

    onFinish = (values) => {
        console.log("values", values);
        const signInfo = { name: values.username, password: values.password };
        // this.setState({signupInfo: {name: values.username, password: values.password}}, () => {
        console.log(signInfo);
        axios.post('/pillow/user-signup/', signInfo).then((res) => {
            console.log("res", res);
            if (res.data.response.error === 'OK') {
                message.info("You've signed up successfully!");
            } else {
                message.error("This is an error message");
            }
        });
        // });
    }

    render() {
        return (
            <>
                <PageHeader className="page-header" title="Sign Up" backIcon={false} />
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
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
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
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default Signup;