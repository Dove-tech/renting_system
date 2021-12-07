import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkbox, Button, PageHeader, DatePicker, Input, InputNumber, Row, Col, Form, message, List, Descriptions } from 'antd';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: {},
            results: null
        }
    }

    search = (searchValue) => {
        // const searchValue = JSON.stringify(this.state.search_value);
        axios.post('/pillow/search/adv_search/', searchValue).then(res => {
            console.log("result", res.data.response.results);
            if (res?.data?.response?.error === "NONE") {
                message.error("No result found!");
            }
            if (res?.data?.response?.results !== '') {
                const results = res.data.response.results;
                console.log(results);
                this.setState({ results });
            }
        }).catch(error => console.log(error.response));
    }

    resultList = () => {
        const results = this.state.results;
        return (<List
            itemLayout="vertical"
            size="large"
            pagination={{pageSize: 5}}
            dataSource={results}
            renderItem={item => (
                <List.Item
                    key={item.id}
                >
                    <List.Item.Meta
                        title={item.name}
                        description={null}
                    />
                    {/* <Link to={{pathname: `/apartment/${item.id}`}}> */}
                    <Link to={{pathname: `/apartment?id=${item.id}`}}>
                    <Row>
                        <Col span="8">
                            <img alt={item.name} src={item.photo_link} style={{maxWidth: '350px'}}/>
                        </Col>
                        <Col span="16">
                            <Descriptions title="Apartment Info" bordered>
                            <Descriptions.Item label="Address">{item.address}</Descriptions.Item>
                            <Descriptions.Item label="Utility">{item.utility}</Descriptions.Item>
                            <Descriptions.Item label="Gym">{item.gym == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                            <Descriptions.Item label="Parking">{item.parking == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                            <Descriptions.Item label="Laundry">{item.laundry == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                            <Descriptions.Item label="Swimming pool">{item.swimming_pool == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                            <Descriptions.Item label="Price Range">${item.min_price}-{item.max_price}</Descriptions.Item>
                            <Descriptions.Item label="Start date">{item.start_date}</Descriptions.Item>
                            <Descriptions.Item label="End date" span={2}>{item.end_date}</Descriptions.Item>
                        </Descriptions>
                        </Col>
                    </Row>
                    </Link>
                </List.Item>)
               }
            >
        </List>);
    }
    // name = request.data.get('name') input
    // gym = request.data.get('gym') boolean
    // parking = request.data.get('parking') boolean
    // utility = request.data.get('utility') int(0-6)
    // laundry = request.data.get('laundry') boolean
    // swimming_pool = request.data.get('swimming_pool') boolean
    // min_price = request.data.get('min_price') input number
    // max_price = request.data.get('max_price') input number
    // start_date = request.data.get('start_date') input time 
    // mean_rate = request.data.get('mean_rate') >= input

    // inputName = () => (<Input onChange={(e) => {
    //     console.log();
    // }} placeholder="Please input the apartment name you want to explore"></Input>);

    FourCheckboxGroup = ({ onChange }) => (<CheckboxGroup style={{ width: '40%' }} onChange={onChange}>
        <Row>
            <Col span={8}><Checkbox value="gym">gym</Checkbox></Col>
            <Col span={8}><Checkbox value="parking">parking</Checkbox></Col>
            <Col span={8}><Checkbox value="laundry">laundry</Checkbox></Col>
            <Col span={8}><Checkbox value="swimming_pool">swimming_pool</Checkbox></Col>
        </Row>
    </CheckboxGroup>);

    UtilityCheckboxGroup = ({ onChange }) => (<CheckboxGroup style={{ width: '40%' }} onChange={onChange}>
        <Row>
            <Col span={10}><Checkbox value="1">water</Checkbox></Col>
            <Col span={10}><Checkbox value="2">electricity</Checkbox></Col>
            <Col span={10}><Checkbox value="3">network</Checkbox></Col>
        </Row>
    </CheckboxGroup>);

    RoomCheckboxGroup = ({ onChange }) => (<CheckboxGroup style={{ width: '40%' }} onChange={onChange}>
        <Row>
            <Col span={8}><Checkbox value="1">1</Checkbox></Col>
            <Col span={8}><Checkbox value="2">2</Checkbox></Col>
            <Col span={8}><Checkbox value="3">3</Checkbox></Col>
            <Col span={8}><Checkbox value="4">4</Checkbox></Col>
        </Row>
    </CheckboxGroup>)

    onFinish = (value) => {
        const { min_price, max_price, mean_rate, utility, bedroom_num, bathroom_num } = value;
        const request = { min_price, max_price, mean_rate };
        if (value.name && value.name !== " ") {
            request.name = value.name;
        }
        if (value.fourcheckbox) {
            const checkedValue = value.fourcheckbox;
            checkedValue.forEach(val => {
                request[val] = true;
            });
        }
        if (value.start_date) {
            const standard = value.start_date.format("YYYY-MM-DD");
            request.start_date = standard;
        }
        if (utility) {
            request.utility = utility.reduce((a, b) => parseInt(a) + parseInt(b));
        }
        if (min_price) {
            request.min_price = min_price;
        }
        if (max_price) {
            request.max_price = max_price;
        }
        if (mean_rate) {
            request.mean_rate = mean_rate;
        }
        if (bedroom_num) {
            request.bedroom_num = bedroom_num;
        }
        if (bathroom_num) {
            request.bathroom_num = bathroom_num;
        }
        console.log("request value", request);
        this.search(request);
    }

    // the whole search form
    form = () => (
        <Form name="search_form" onFinish={this.onFinish}>
            <Form.Item name="name">
                <Input onChange={(e) => { console.log("input1", e.target.value) }}
                    placeholder="Please input the apartment name you want to explore" />
            </Form.Item>
            <Form.Item name="fourcheckbox">
                <this.FourCheckboxGroup onChange={this.onChange} />
            </Form.Item>
            <Form.Item name="utility" label="Utility (Rental Includes)">
                {/* <InputNumber min={0} max={6}></InputNumber> */}
                <this.UtilityCheckboxGroup onChange={this.onChange}/>
            </Form.Item>
            <Form.Item name="min_price" label="Min Price">
                <InputNumber min={500} max={1000}></InputNumber>
            </Form.Item>
            <Form.Item name="max_price" label="Max Price">
                <InputNumber min={500} max={1000}></InputNumber>
            </Form.Item>
            <Form.Item name="start_date" label="Start Date">
                <DatePicker></DatePicker>
            </Form.Item>
            <Form.Item name="mean_rate" label="Min Rate">
                <InputNumber min={0} max={5} step={0.5}></InputNumber>
            </Form.Item>
            <Form.Item name="bedroom_num" label="Bedroom Num">
                {/* <InputNumber min={0} max={4} step={1}></InputNumber> */}
                <this.RoomCheckboxGroup />
            </Form.Item>
            <Form.Item name="bathroom_num" label="Bathroom Num">
                {/* <InputNumber min={0} max={4} step={1}></InputNumber> */}
                <this.RoomCheckboxGroup />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>
    );

    render() {
        return (<div>
            <PageHeader className="page-header" title="Search" backIcon={false} />
            <this.form />
            {this.state.results && <this.resultList />}
        </div>)
    }
}

export default Search;