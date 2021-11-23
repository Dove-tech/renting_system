import { Form, Input, Checkbox, Button, Modal, message, List, Card, Descriptions } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session_id,
            user: 1,
            favoriteList: null,
            deleteInfo: {
                user: '',
                room: ''
            }
        }
    }

    componentDidMount() {
        this.setState({ session_id:window.sessionStorage.getItem("user")  }, () => {
            console.log("state", this.state.session_id);
        });
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

    deleteFav = (room_id) => {
        const deleteInfo = { user: this.state.user, room: room_id };
        axios.post('/pillow/favorite/deleteFavorite/', deleteInfo).then((res) => {
            console.log("res", res);
            if (res.data.response.error === 'OK') {
                message.info("You've deleted successfully!");
                this.getFavorite();
            } else {
                message.error("This is an error message");
            }
        });
    }

    getFavorite = () => {
        const request = {user: this.state.user};
        axios.post('/pillow/favorite/query_all_favorite/', request).then(res => {
            console.log(res);
            if (res?.data?.response?.results) {
                this.setState({favoriteList: res?.data?.response?.results})
            }
        }).catch(e => console.log(e));
    };

    favoriteList = () => (
        <List 
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.state.favoriteList}
            renderItem={item => (
            <List.Item>
                <Card title="Room ID">{item}</Card>
                <Button onClick={() => {
                    this.deleteFav(item)
                }}>Delete</Button>
            </List.Item>
            )}  
        />
    );

    render() {
        return <div>
                {/* <Form
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
                </Form> */}
                {this.state.favoriteList && this.favoriteList()} 
        </div>;
    }
}

export default Favorite;