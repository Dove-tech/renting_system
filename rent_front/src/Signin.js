import { Form, Input, Checkbox, Button, Modal, message, PageHeader } from "antd";
import React, { useState, Component } from "react";
import axios from "axios";
import { getCurrentUser } from "./utils";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: null
    }
  }

//   componentDidUpdate() {
//     const user = getCurrentUser()
//     console.log("getCurrentUser", user);
//     if (user) {
//         //   this.state.setState({userId: getCurrentUser()});
//         this.props.getUser(user);
//     }
//   }

  onFinish = values => {
    console.log("values", values);
    const signinInfo = { name: values.username, password: values.password };
    // this.setState({signupInfo: {name: values.username, password: values.password}}, () => {
    console.log(signinInfo);
    axios.post("/pillow/user-signin/", signinInfo).then(res => {
      console.log("res", res);
      if (res.data.response.error === "OK") {
        const userId = res.data.response.id;
        message.info("You've signed in successfully!");
        this.props.getUser(userId);
        window.localStorage.setItem("user", userId);
      } else {
        message.error("Password is not correct");
      }
    });
  };

  render() {
    return (
      <>
        <PageHeader className="page-header" title="Sign In" backIcon={false} />
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
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
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Signin;
