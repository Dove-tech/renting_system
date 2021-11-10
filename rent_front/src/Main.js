import { Form, Input, Checkbox, Button, Modal, message } from 'antd';
import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
    }

    render() {
        return <div>
            <Button onClick={this.handleClick}>Sign up</Button>
        </div>;
    }
}

export default Main;