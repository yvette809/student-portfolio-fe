import React from 'react'
import { Card, Row, Col, Button, Container, Modal,Form } from 'react-bootstrap'
import { Link } from "react-router-dom"

class Students extends React.Component{

  state = {

    newStudent:{
      name: '',
      surname:'',
      email:'',
      dateOfBirth:'',
      country:"",
      image: null
     
    },
  }

  editStudent = async (e)=>{
    e.preventDefault()
    const toSend = this.state.newStudent
    delete toSend.image
    let response = await fetch("http://localhost:3001/students" + this.state.newStudent.id, {
      method:"PUT",
      body:JSON.stringify(toSend),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if (response.ok){
      const student = await response.json()
      this.setState({
        newStudent:{
          name: '',
          surname:'',
          email:'',
          dateOfBirth:'',
          country:"",
          image: null
        
        },
        showModal:false
        
      })
    }else{
      alert ("something went wrong")
    }
    
  }

  render(){
    return (
      <Container>
        <Row className="text-center mr-2">
          {this.props.data.map(stud =>
            <Col lg={3} md={4} xs={6}>
              <Card style={{ width: '18rem' }} id={stud._id}>
                <Link to={`/details/${stud._id}`}><Card.Img variant="top" src={stud.image} style={{ borderRadius: "100%" }} /></Link>
                <Card.Body>
                  <Card.Title>{stud.name}- {stud.surname}</Card.Title>
                  <Card.Text>
                    {stud.country}
                  </Card.Text>
                  {/* <Button variant="warning" onClick={() => this.props.fetchOneStudent(stud.id)} className="mr-2">Edit</Button> */}
                  <Button onClick={() => this.setState({showModal:true})}> Edit Student</Button>
      
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
    type="text" 
    id = "image"
    placeholder="imageURL"
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
                  <Button variant="danger" onClick={() => {this.props.deleteStud(stud._id)}}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
  
          )}
  
        </Row>
      </Container>
  
    )
  }

}

 



export default Students