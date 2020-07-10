import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import{BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import Students from './components/Student'
import Details from './components/Details'
import Home from './components/Home'
import Navigation from './components/Navigation'
import {Modal, Button, Form} from 'react-bootstrap'


class App extends React.Component{
 state = {

 }

 render(){
   return(
     <Router>
     <>
     <Navigation/>
     <Route path="/" exact><Home/></Route>
     <Route path="/details/:_id" ><Details/></Route>
     </>
     </Router>
   )
 }

}

export default App