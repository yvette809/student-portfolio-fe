import React from 'react'
import { Card, Row, Col, Button, Container } from 'react-bootstrap'
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
                  <Button variant="warning" onClick={() => this.props.fetchOneStudent(stud.id)} className="mr-2">Edit</Button>
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