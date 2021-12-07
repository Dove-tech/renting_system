import { PageHeader, Row, Col, Button, message, List, Descriptions } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import { HeartTwoTone } from '@ant-design/icons';
import { getCurrentUser } from './utils';

class Detail extends Component {
  constructor(props) {
    super(props);
    const params = new URL(window.location).searchParams;
    this.state = {
      apartment_id: params.get('id'),
      // user_id: this.props.userId,
      user_id: getCurrentUser(),
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
    if (this.state.user_id === null || this.state.user_id === '') {
      console.log("no current user");
    }
    const request = { user: '0', room: room_id }
    axios.post('/pillow/search/addToFavorite/', request).then(res => {
      if (res?.data?.response?.error === "successful") {
        message.info("You have successfully added to your favorite list!");
      } else {
        message.error("You have added this room to Favorite");
      }
    }).catch(e => console.log(e));
  }

  render() {
    const apartment_info = this.state.apartment_info;
    return (<div>
      <PageHeader className="page-header" title="Apartment Detail" backIcon={false} />
      {this.state.apartment_info && <>
        <div className="apart-photo"></div>
        <div className="apart-info">
          <Row>
            <Col span={12}><h1>{apartment_info.apartment_name}</h1></Col>
            {/* <Col span={8}><Button onClick={}></Button></Col> */}
            <Col span={12}><h1>Rating: {apartment_info.rating}</h1></Col>
          </Row>
          <Row>
            {apartment_info.photo_link && apartment_info.photo_link.map(photo => {
              return <img alt={apartment_info.apartment_name} src={photo} style={{maxWidth: '400px'}}/>
            })}
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <Descriptions title="Apartment Info" bordered>
                <Descriptions.Item label="Description">{apartment_info.department_description}</Descriptions.Item>
                <Descriptions.Item label="Address">{apartment_info.address}</Descriptions.Item>
                <Descriptions.Item label="Utility">{apartment_info.utility}</Descriptions.Item>
                <Descriptions.Item label="Gym">{apartment_info.gym == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Parking">{apartment_info.parking == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Laundry">{apartment_info.laundry == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Swimming pool">{apartment_info.swimming_pool == 1 ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Price Range">${apartment_info.min_price}-{apartment_info.max_price}</Descriptions.Item>
                {/* <Descriptions.Item label="Start date">{apartment_info.start_date}</Descriptions.Item>
                <Descriptions.Item label="End date" span={2}>{apartment_info.end_date}</Descriptions.Item> */}
              </Descriptions>
            </Col>
            <Col className="gutter-row" span={12}>
              <Descriptions title="Landlord Info" bordered>
                {/* {} */}
                <Descriptions.Item label="Name">{apartment_info.lanlord_info.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{apartment_info.lanlord_info.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{apartment_info.lanlord_info.phone}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </div>
        <div className="room-info">
          <List
            itemLayout="horizontal"
            dataSource={apartment_info.rooms}
            renderItem={(item, i) => (
              <List.Item>
                <h3>Room Type {i + 1}</h3>
                <img alt={item.name} src="https://liveatoctave.com/sites/liveatoctave.com/files/styles/floorplan_full_570x780/public/Octave_B1.jpg?itok=zPoP46fa" style={{maxWidth: '200px'}}/>
                <Descriptions bordered>
                  <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
                  <Descriptions.Item label="Price">${item.price}</Descriptions.Item>
                  {/* <Descriptions.Item label="Add to Favorite"></Descriptions.Item> */}
                  <Descriptions.Item label="Start">{item.start_time}</Descriptions.Item>
                  <Descriptions.Item label="End">{item.end_time}</Descriptions.Item>
                </Descriptions>
                <Button icon={<HeartTwoTone twoToneColor="#eb2f96" />} shape="circle" onClick={() =>this.addToFavorite(item.id)}></Button>
              </List.Item>
            )}
          >
          </List>
        </div>
      </>}
    </div>)
  }
}

export default Detail;