import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory as history } from 'react-router';
import { BrowserRouter as Router, Routes, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import { SearchOutlined, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import './css/main.css';
import './index.css';
import Favorite from './Favorite';
import Signup from './Signup';
import Signin from './Signin';
import Resetpassword from './Resetpassword';
import Search from './Search';
// import Main from './Main';
// import Compare from './Compare';
import Detail from './Detail';

const { Header, Content } = Layout;

const myMenu = (
  <Menu>
    {/* <Link to="/signup"><Menu.Item>Sign Up</Menu.Item></Link>
    <Link to="/signin"><Menu.Item>Sign In</Menu.Item></Link> */}
    <Link to="/resetpassword"><Menu.Item>Reset Password</Menu.Item></Link>
    <Menu.Item>Log Out</Menu.Item>
  </Menu>
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    }
  }
  
  componentDidUpdate() {
  }

  // Sign in set userId
  returnUser = (userId) => {
    console.log("get userId", userId);
    this.setState({userId});
  }

  render() {
    return <Router>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu className="nav-menu" mode="horizontal">
            <Menu.Item key="search" icon={<SearchOutlined style={{ color: "#52c41a" }} />}>
              <Link to='/search'>Search</Link>
            </Menu.Item>
            <Menu.Item key="favorite" icon={<HeartTwoTone twoToneColor="#eb2f96" />}>
              <Link to='/favorite'>Favorite</Link>
            </Menu.Item>
            {!this.state.userId ? <>
              <Menu.Item key="register">
                <Link to='/signup'>Register</Link>
              </Menu.Item>
              <Menu.Item key="signin">
                <Link to='/signin'>Sign in</Link>
              </Menu.Item>
            </>
              :
              (<Dropdown overlay={myMenu}>
                <Menu.Item key="user" icon={<SmileTwoTone />}>My
                </Menu.Item>
              </Dropdown>)}
          </Menu>
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <Routes>
            {/* <Route exact path='/' element={<Main />}></Route> */}
            <Route exact path='/' element={<Signin />}></Route>
            <Route exact path='/search' element={<Search userId={this.state.userId}/>} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/signin' element={<Signin getUser={this.returnUser}/>} />
            <Route exact path='/resetpassword' element={<Resetpassword userId={this.state.userId}/>} />
            <Route exact path='/favorite' element={<Favorite userId={this.state.userId}/>} />
            <Route exact path='/apartment/:id' element={<Detail userId={this.state.userId}/>} />
            {/* <Route exact path='/compare' element={<Compare />} /> */}
          </Routes>
        </Content>
      </Layout>
    </Router>;
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

