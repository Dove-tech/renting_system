import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    search = () => {
        const name = 'a';
        axios.post('/pillow/search/', name).then(res => {
            console.log(res);
        }).catch(error => console.log(error.response.data));
    }

    render() {
        return 
    }
}

export default Search;