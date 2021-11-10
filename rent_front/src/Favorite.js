import { Form, Input, Checkbox, Button, Modal, message } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteInfo: {
                user: '',
                room: ''
            }
        }
    }

    onFinish = (values) => {
        console.log("values", values);
        const deleteInfo = { user: values.user, room: values.room };
        axios.post('/pillow/favorite/deleteFavorite/', deleteInfo).then((res) => {
            console.log("res", res);
            if (res.data.response.error === 'OK') {
                message.info("You've deleted successfully!");
            } else {
                message.error("This is an error message");
            }
        });
    }

    render() {
        return <div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="User_id"
                        name="user"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the user id for the record',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Room_id"
                        name="room"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the room id for the record!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Delete
                        </Button>
                    </Form.Item>
                </Form>
        </div>;
    }
}

export default Favorite;