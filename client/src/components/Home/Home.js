import React, { Component } from 'react';
import axios from 'axios';
import HomeNav from './../HomeNav/HomeNav';
import Feed from './Feed';

class Home extends Component {
    state =
        {
            feedItem: []
        };
    render() {
        return (
            <div>
                <HomeNav />
                <Feed />
            </div>
        )
    };
}

export default Home;