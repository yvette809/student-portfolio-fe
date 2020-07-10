import React from 'react';

import Students from './Student'
import {Modal, Button, Form} from 'react-bootstrap'


class Home extends React.Component{
  state = {
    students:[],
    addNewStudent:false,
    editStudent:false,
    
    newStudent:{
      name: '',
      surname:'',
      email:'',
      date:'',
      loading:true
    },
    showModal: false
  }

  fetchStudents = async () =>{
    let response = await fetch("http://localhost:3001/students")
    if(response.ok){
      let students = await response.json()
    console.log("students of", students)
    this.setState({students:students, loading:false})

    }else{
      alert("something went wrong")
    }
    
  }
  componentDidMount = async ()=>{
    this.fetchStudents()
  }

  fetchOneStudent = async (id) =>{
    let response = await fetch("http://localhost:3001/students" + id)
    if(response.ok){
      let student = await response.json()
      console.log("the student is", student)
      this.setState({
        editStudent:true,
        newStudent:student[0]
      })
    }else{
      alert("something went wrong")
    }
  }

  addNewStudent = async (e) => {
    e.preventDefault()
    let response = await fetch("http://localhost:3001/students",{
      method: "POST",
      body:JSON.stringify(this.state.newStudent),
      headers:{
      "Content-Type":"application/json"
      }
    })
    if(response.ok){
      alert("student added")
      this.setState({
        newStudent:{
          name:"",
          id:"",
          surname:"",
          email:"",
          date: "",
          image:"",
          loading:false

        }
      })

    }else{
      alert("An error has occured")
    }
  }

  

  deleteStudent = async (_id) => {
    let response = await fetch("http://localhost:3001/students" + _id,{
      method:"DELETE"
    })
    if(response.ok){
      let students= await response.json()
      this.setState({
         students:this.state.students.filter(x =>x._id !== _id)
        
      })
    }else{
      alert("student not deleted")
    }
  }

 



  handleChange = (e)=> {
    let newStudent = this.state.newStudent
    console.log(e.currentTarget)
    let currentId = e.currentTarget.id
    newStudent[currentId]= e.currentTarget.value
    this.setState({newStudent})
  }

  render(){
    return(
      <>
      <Students 
      data = {this.state.students}
      fetchOneStudent={this.fetchOneStudent}
      deleteStud = {this.deleteStudent}
    
      />
      <Button onClick={() => this.setState({showModal:true})}> Add student</Button>
      
      <Modal
     show ={this.state.showModal}
      // onHide = {() => this.setState({selected:!this.state.showModal})}
      >
  <Modal.Header closeButton  onClick={() => this.setState({showModal:false})}>
    <Modal.Title>Students</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <div>
      <h5>Add A New Student</h5>
    </div>
    <div>
    <Form onSubmit = {this.addNewStudent}>
    <Form.Control 
    type="text"
    name="name" 
    id = "name"
    placeholder="Enter name"
    value = {this.state.newStudent.name}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="text" 
    id = "surname"
    placeholder="Enter surname"
    value = {this.state.newStudent.surname}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="email" 
    id = "email"
    placeholder="Enter email"
    value = {this.state.newStudent.email}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="Date" 
    id = "Date"
    placeholder="Chose Date Of Birth"
    value = {this.state.newStudent.date}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="Date" 
    id = "image"
    placeholder="Chose Date Of Birth"
    value = {this.state.newStudent.image}
    onChange= {this.handleChange}
    />
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </div>
  </Modal.Body>
</Modal>
      </>
    )
  }



}

export default Home