import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Students from './components/Student'
import Home from './components/Home'
import Navigation from './components/Navigation'
import {Modal, Button, Form} from 'react-bootstrap'


class App extends React.Component{
 state = {

 }

 render(){
   return(
     <>
     <Navigation/>
     <Home/>
     </>
   )
 }

}

export default App