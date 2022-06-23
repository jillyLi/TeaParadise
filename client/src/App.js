

// import spatula from './assets/spatula.jpg';
import StripeContainer from './components/StripeContainer';
import './App.css';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import React, { Component }  from 'react';
import Main from './components/Main';
import Customize from './components/Customize';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Purchase from './components/Purchase';
import Edit from './components/Edit';
import SignUp2 from './components/SignUp2';
import Slider from './components/Slider';
import { SliderData } from './components/SliderData';

function App() {


  return (
    <div className="App">

      <Switch>

        <Route path="/teas">
          <Main slides={SliderData}/>
          {/* <Slider slides={SliderData}/> */}
        </Route>

        <Route path="/signUp">
          <SignUp2 />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/menu">
          <Menu />
        </Route>

        <Route path="/purchase">
          <Purchase />
        </Route>

      <Route path="/card">
        <StripeContainer />
      </Route>
      <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/customize/:id">
          <Customize />
        </Route>

        <Route path="/">
          <Redirect to = "/teas" />
        </Route>




      </Switch>

    </div>
  );
}

export default App;
