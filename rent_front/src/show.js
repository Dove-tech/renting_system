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
        axios.post('/pillow/search/fetchDetails/', request).then(res => {
          console.log(res);
          if (res?.data?.response?.results) {
            this.setState({shown_apartment: res?.data?.response.results})
          }
        }).catch(e => console.log(e));
    };

    show_apart_info() {
        return (
          <Descriptions title="Apartment Info" bordered>
          <Descriptions.Item label="name">{this.state.shown_apartment.apartment_name}</Descriptions.Item>
      </Descriptions>
        );
    }
    render() {
      return (<div><h1>details</h1>
          {this.state.shown_apartment && <this.show_apart_info />}
      </div>)
  }
}

export default Show;