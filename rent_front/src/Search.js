import React, { Component } from 'react';
import axios from 'axios';
import { Checkbox, Divider, Row, Col } from 'antd';

const CheckboxGroup = Checkbox.Group;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: {}
        }
    }

    onChange = (checkedValue) => {
        let new_search_value = {};
        checkedValue.forEach(val => {
            new_search_value[val] = true
        });
        console.log(new_search_value);
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
    checkbox = () => (<CheckboxGroup style={{ width: '40%'}} onChange={this.onChange}>
        <Row>
            <Col span={8}><Checkbox value="gym">gym</Checkbox></Col>
            <Col span={8}><Checkbox value="parking">parking</Checkbox></Col>
            <Col span={8}><Checkbox value="laundry">laundry</Checkbox></Col>
            <Col span={8}><Checkbox value="swimming_pool">swimming_pool</Checkbox></Col>
        </Row>
    </CheckboxGroup>);

    search = () => {
        const name = 'a';
        axios.post('/pillow/search/', name).then(res => {
            console.log(res);
        }).catch(error => console.log(error.response.data));
    }

    render() {
        return <div><h1>Search</h1></div>
    }
}

export default Search;