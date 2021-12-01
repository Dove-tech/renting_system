import { PageHeader, List, Descriptions } from 'antd';
import React, { Component } from 'react';
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
        return (<div>
            <PageHeader className="page-header" title="Apartments Browser" backIcon={false} />
            {this.state.apartmentList && <this.resultList />}
        </div>)
    }
}

export default Evaluate;