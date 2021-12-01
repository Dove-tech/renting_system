import { Row, Col, Form, Input, Checkbox, Button, Modal, message, List, Card, Descriptions } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';

const apartment_info = {
  address: "rlmHgokPGO",
  apartment_name: "Elizabeth Macias",
  bathroom_num: "1",
  bedroom_num: "1",
  department_description: "None",
  end_time: "2023-10-29",
  gym: "0",
  landlord_email: "VSSreXR@gmail.com",
  landlord_name: "Cliff Neeley",
  landlord_phone: "645-234-3349",
  laundry: "1",
  location: "(48.55029, 26.28232)",
  max_price: "640",
  min_price: "539",
  parking: "0",
  photo_link: "https://liveatoctave.com/sites/liveatoctave.com/files/1539_06a.jpg",
  price: "658.4",
  rating: 4,
  room_description: "None",
  start_time: "2022-10-29",
  swimming_pool: "0",
  utility: "6"
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartment_id: 269,
      user_id: this.props.userId,
      // apartment_id: this.props.location,
      // apartment_id: this.props.match,
      apartment_info: null
    };
  }

  componentDidMount() {
    this.getEverything();
  }

  getEverything = () => {
    const request = { id: this.state.apartment_id }
    axios.post('/pillow/search/fetchDetails/', request).then(res => {
      console.log(res);
      if (res?.data?.response?.results) {
        this.setState({ apartment_info: res?.data?.response.results })
      }
    }).catch(e => console.log(e));
  };

  show_apart_info = () => {
    return (
      <Descriptions title="Apartment Info" bordered>
        <Descriptions.Item label="name">
          {/* {this.state.shown_apartment} */}
        </Descriptions.Item>
      </Descriptions>
    );
  }
  addToFavorite = (room_id) => {
    const request = {user_id: this.state.user_id, room_id: room_id}
    axios.post('/pillow/search/addToFavorite/', request).then(res => {
      if (res?.data?.response?.error === "successful") {
        console.log(res);
        message.info("You have successfully added to your favorite list!");
      }
    }).catch(e => console.log(e));
  }

  render() {
    return (<div><h1>details</h1>
      {this.state.apartment_info && <>
        <div className="apart-photo"></div>
        <div className="apart-info">
          <Row>
            <Col span={8}>{apartment_info.apartment_name}</Col>
            <Col span={8}><Button></Button></Col>
            <Col span={8}>{apartment_info.rating}</Col>
          </Row>
        </div>
        <div className="room-info"></div>
      </>}
    </div>)
  }
}

export default Detail;