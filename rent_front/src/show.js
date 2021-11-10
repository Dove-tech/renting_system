import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }
    handleChange = (e) => {
        const activeItem = { ...this.state.activeItem, [name]: value };
    
        this.setState({ activeItem });
      };
    
    componentDidMount() {
       this.getEverything();
    }

    getEverything = () => {
        axios.post('/pillow/Search', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <Form>
            <FormGroup>
              <Label for="search">Search</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter ..."
              />
            </FormGroup>
            <button onClick={() => onSave(this.state.activeItem)}>
                search
            </button>
            </Form>
        );
    }
}

export default Signup;