import React from 'react'
import{Card,Row,Col ,Button, Container} from 'react-bootstrap'
import{Link} from "react-router-dom"


const Students = (props) => {
    return(
        <Container>
            <Row className = "text-center mr-2">
        {props.data.map (stud => 
        <Col lg ={3} md={4} xs={6}>
        <Card style={{ width: '18rem' }} id = {stud._id}>
  <Link to="/details:_id"><Card.Img variant="top" src={stud.image}  style = {{borderRadius:"100%"}}/></Link>
  <Card.Body>
    <Card.Title>{stud.name}- {stud.surname}</Card.Title>
    <Card.Text>
      {stud.country}
    </Card.Text>
    <Button variant ="warning" onClick= {()=>props.fetchOneStudent(stud.id)} className = "mr-2">Edit</Button>
    <Button variant ="danger" onClick = {()=>props.deleteStudent(stud.id)}>Delete</Button>
  </Card.Body>
</Card>
        </Col>
  
            )}
                 
         </Row>
        </Container>
        
    )
}


export default Students