import React from 'react'
import{Card,Row,Col ,Button, Container} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

 class Details extends React.Component {

    state = {
        student: ""
    }
    id = this.props.match.params._id

    fetchSingleStudent = async (id) =>{
        let response = await fetch("http://localhost:3001/students" + id)
        if(response.ok){
          let student = await response.json()
          console.log("the student is", student)
          this.setState({
            student:student
          })
        }else{
          alert("something went wrong")
        }
      }

      componentDidMount = async()=>{
          this.fetchSingleStudent()
      }


    render() {
        return (
            <Container>
            <Row className = "text-center mr-2">
       
        <Col lg ={3} md={4} xs={6}>
        <Card style={{ width: '18rem' }} id = {this.state.student._id}>
  <Card.Img variant="top" src={this.state.student.image}  style = {{borderRadius:"100%"}}/>
  <Card.Body>
    <Card.Title>{this.state.student.name}- {this.state.student.surname}</Card.Title>
    <Card.Text>
      {this.state.student.country}
    </Card.Text>
    
  </Card.Body>
</Card>
        </Col>
  
            )
                 
         </Row>
        </Container>
        
    )
}            
    
 }

export default withRouter(Details)