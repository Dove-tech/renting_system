import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory as history } from 'react-router';
import { BrowserRouter as Router, Routes, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Favorite from './Favorite';
import Signup from './Signup';
import Signin from './Signin';
import Resetpassword from './Resetpassword';
import Search from './Search';
import Main from './Main';
import Compare from './Compare';
import Detail from './Detail';

ReactDOM.render(
  <Router>
      <Routes>
      <Route exact path='/' element={<Main />}></Route>
      <Route exact path='/search' element={<Search />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/signin' element={<Signin />} />
      <Route exact path='/resetpassword' element={<Resetpassword />} />
      <Route exact path='/favorite' element={<Favorite />} />
      <Route exact path='/compare' element={<Compare />} />
      <Route exact path='/apartment' element={<Detail />}/>
      </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
