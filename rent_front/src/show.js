import { Form, Input, Checkbox, Button, Modal, message, List, Card, Descriptions } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment_id: 0,
            shown_apartment: null
        };
    }
    componentDidMount() {
       this.getEverything();
    }

    getEverything = () => {
      const request = {id: this.state.apartment_id}
        axios.post('/pillow/search/fetchDetails', request).then(res => {
          console.log(res);
          if (res?.data?.response?.results) {
            this.setState({shown_apartment: res?.data?.response.results})
          }
        }).catch(e => console.log(e));
    };

    render() {
        return (
          <Descriptions title="Apartment Info" bordered>
          <Descriptions.Item label="Address">{this.state.shown_apartment[0].address}</Descriptions.Item>
          <Descriptions.Item label="Utility">{this.state.shown_apartment[0].utility}</Descriptions.Item>
          <Descriptions.Item label="Gym">{this.state.shown_apartment[0].gym === 1 ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Parking">{this.state.shown_apartment[0].parking === 1 ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Laundry">{this.state.shown_apartment[0].laundry === 1 ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Swimming pool">{this.state.shown_apartment[0].swimming_pool === 1 ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Price Range">${this.state.shown_apartment[0].min_price}-{this.state.shown_apartment[0].max_price}</Descriptions.Item>
          <Descriptions.Item label="Start date">{this.state.shown_apartment[0].start_date}</Descriptions.Item>
      </Descriptions>
        );
    }
}

export default Show;