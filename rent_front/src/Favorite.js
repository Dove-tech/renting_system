import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

const userList = [
    {
        'id': 0,
        'name': 'Jack Wixom',
        'password': 'qHYgwUc@gmail.com'
    }, {
        'id': 1,
        'name': 'Janet Wise',
        'password': 'sROkowT@gmail.com'
    }
];

const favoriteList = [
    {
        'user': 'a',
        'room': 'aaaa'
    }
];

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteList: favoriteList
        }
    }

    componentDidMount() {
       this.getFavoriteList();
    }

    getFavoriteList = () => {
        axios.get('/pillow/favorite/')
            .then(res => {
                this.setState({favoriteList: res.data});
                console.log(res);
            })
            .catch(e => console.log(e));
    }

    addFavorite = () => {
        const favoInfo = { user: 1, room: 4 };
        axios.post('/pillow/favorite/', favoInfo).then(res => {
            console.log(res);
        }).catch(error => console.log(error.response.data));
    }

    deleteFavorite = () => {
        
    }

    render() {
        return <div>
            <h1>Sign Up</h1>
            <div>Favorite List</div>
            <span>user_id room_id</span>
            {
                this.state.favoriteList.map(item => <div>
                    <span>{item.user} {item.room}</span>
                </div>)
            }
        </div>
    }
}

export default Favorite;