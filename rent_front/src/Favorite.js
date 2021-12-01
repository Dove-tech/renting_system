import { Form, Input, Checkbox, Button, Modal, message, List, Card, Descriptions } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 3,
            favoriteList: null,
            deleteInfo: {
                user: '',
                room: ''
            }
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem("user");
        if (userId) {
            this.setState({ user: userId }, () => {
                console.log("current user", this.state.user);
                this.getFavorite();
            });
        }
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

    favoriteList = () => (
        <List
            itemLayout="vertical"
            size="small"
            pagination={{pageSize: 5}}
            dataSource={this.state.favoriteList}
            renderItem={item => (
                <List.Item
                    key={item.id}
                >
                    <List.Item.Meta
                        title={item.apartment_name + " " + item.bedroom_num + "b" + item.bathroom_num + "b"}
                        description={null}
                    />
                    <Descriptions title="Room Info" bordered>
                        <Descriptions.Item label="Price">{item.price}</Descriptions.Item>
                        <Descriptions.Item label="date">{item.start_time}-{item.end_time}</Descriptions.Item>
                    </Descriptions>
                    <Button onClick={() => {
                    this.deleteFav(item.id)
                }}>Delete</Button>
                </List.Item>)
               }
            >
        </List>
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