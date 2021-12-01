import { Form, Input, Checkbox, Button, Modal, message, List, Card, Descriptions } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartmentList: null
        }
    }

    componentDidMount() {
        this.getApartment();
    }

    getApartment = () => {
        axios.post('/pillow/apartmentlist/showApartment/').then(res => {
            console.log(res);
            if (res?.data?.response?.result) {
                this.setState({apartmentList: res?.data?.response?.result})
            }
            console.log(this.state.apartmentList)
        }).catch(e => console.log(e));
    };

    resultList = () => {
        const results = this.state.apartmentList;
        console.log(results)
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
                    <Descriptions title="Apartment Info" bordered>
                        <Descriptions.Item label="Address">{item.address}</Descriptions.Item>
                        <Descriptions.Item label="Location">{item.location}</Descriptions.Item>
                        <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
                        <Descriptions.Item label="Evaluation">{item.evaluation}</Descriptions.Item>
                    </Descriptions>
                </List.Item>)}
            >
        </List>);
    }

    render() {
        console.log(this.state.apartmentList)
        return (<div><h1>Apartments and their evaluation</h1>
            {this.state.apartmentList && <this.resultList />}
        </div>)
    }
}

export default Evaluate;