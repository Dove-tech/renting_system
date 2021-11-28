import { Layout, Menu, Dropdown } from 'antd';
import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import './css/main.css';
import { BulbTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';

const { Header, Content } = Layout;
const { SubMenu } = Menu;

class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    my = (<Menu>
        <Menu.Item></Menu.Item>
    </Menu>);

    render() {
        return <Layout>
            <Header>
                <div className="logo" />
                <Menu className="nav-menu" mode="horizontal">
                    <Menu.Item key="compare" icon={<BulbTwoTone twoToneColor="#52c41a" />}>
                        Compare
                    </Menu.Item>
                    <Menu.Item key="favorite" icon={<HeartTwoTone twoToneColor="#eb2f96" />}>
                        Favorite
                    </Menu.Item>
                    <Menu.Item key="user" icon={<SmileTwoTone />}>
                        My
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="content"></div>
            </Content>
        </Layout>
    }
}

export default Main;