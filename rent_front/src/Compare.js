import React, { Component } from 'react';
import axios from 'axios';
import { Checkbox, Button, Divider, DatePicker, Input, InputNumber, Row, Col, Form, message, List, Descriptions } from 'antd';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;


class Nested extends Component {
    constructor(props) {
        super(props);
    }
    info_apartment = () => {
        const info = this.props.data;
        return (<List
            itemLayout="vertical"
            size="large"
            pagination={{pageSize: 5}}
            dataSource={info}
            renderItem={item => (
                <List.Item
                    key={item.id}
                >
                    <List.Item.Meta
                        title={item.name}
                        description={null}
                    />
                    <Descriptions title="Apartment Info" bordered>
                        <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                        <Descriptions.Item label="MinPrice">{item.min_price}</Descriptions.Item>
                        <Descriptions.Item label="MaxPrice">{item.max_price}</Descriptions.Item>
                        <Descriptions.Item label="Star">{item.star}</Descriptions.Item>
                    </Descriptions>
                </List.Item>)}
            >
        </List>);

    }
    render() {
        return (<div>
            {<this.info_apartment />}
        </div>)
    }

}



export default class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left_id: 1,
            right_id: 2,
            info_left: null,
            info_right: null
        }
    }

    componentDidMount = () => {
        // const searchValue = JSON.stringify(this.state.search_value);
        const request = { left_id: this.state.left_id, right_id: this.state.right_id };
        axios.post('/pillow/compare/show_compare_result/', request).then(res => {
            console.log(res.data.response.info_left);
            if (res?.data?.response?.error === "error") {
                message.error("No result found!");
            }
            if (res?.data?.response?.info_left !== '') {
                const info_left = res.data.response.info_left;
                const info_right = res.data.response.info_right;
                console.log(info_left);
                console.log(info_right);
                this.setState({ info_left: info_left });
                this.setState({ info_right: info_right })
            }
        }).catch(error => console.log(error.response));
    }

    // the whole search form
//    form = () => (
//        <Form name="search_form" onFinish={this.onFinish}>
//            <Form.Item name="name">
//                <Input onChange={(e) => { console.log("input1", e.target.value) }}
//                    placeholder="Please input the apartment name you want to explore" />
//            </Form.Item>
//            <Form.Item name="fourcheckbox">
//                <this.FourCheckboxGroup onChange={this.onChange} />
//            </Form.Item>
//            <Form.Item name="utility" label="Utility(0-6)">
//                <InputNumber min={0} max={6}></InputNumber>
//            </Form.Item>
//            <Form.Item name="min_price" label="Min Price">
//                <InputNumber min={500} max={1000}></InputNumber>
//            </Form.Item>
//            <Form.Item name="max_price" label="Max Price">
//                <InputNumber min={500} max={1000}></InputNumber>
//            </Form.Item>
//            <Form.Item name="start_date" label="Start Date">
//                <DatePicker></DatePicker>
//            </Form.Item>
//            <Form.Item name="mean_rate" label="Min Rate">
//                <InputNumber min={0} max={5} step={0.5}></InputNumber>
//            </Form.Item>
//            <Form.Item name="bedroom_num" label="Min Bedroom Num">
//                {/* <InputNumber min={0} max={4} step={1}></InputNumber> */}
//                <this.RoomCheckboxGroup />
//            </Form.Item>
//            <Form.Item name="bathroom_num" label="Min Bathroom Num">
//                {/* <InputNumber min={0} max={4} step={1}></InputNumber> */}
//                <this.RoomCheckboxGroup />
//            </Form.Item>
//            <Form.Item>
//                <Button type="primary" htmlType="submit">
//                    Search
//                </Button>
//            </Form.Item>
//        </Form>
//    );
    render() {
        return (<div><h1>Compare</h1>
//            < this.form />
            {this.state.results && <Nested data={this.state.info_left} />}
        </div>)
    }
}

