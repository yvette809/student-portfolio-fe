import React from 'react'
import{Card,Row,Col ,Button, Container,Table} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

 class Details extends React.Component {

    state = {
        student: "",
        projects:""
    }
    

    fetchSingleStudent = async () =>{
        const id = this.props.match.params._id
        
        let response = await fetch("http://localhost:3001/students/" + id)
        if(response.ok){
          let student = await response.json()
          console.log("the student is", student)
          this.setState({
            student
          })
        }else{
          alert("something went wrong")
        }
      }

      componentDidMount = async ()=>{
        this.fetchSingleStudent()
      }
    
      fetchProject = async () => {
        const id = this.props.match.params._id
        let resp = await fetch("http://localhost:3001/students/" + id + "/projects")

        if (resp.ok) {
            let projects = await resp.json()
            console.log(projects)
            this.setState({
                projects:projects.data
            });
        } else {
            alert("Something went wrong!")
        }
    }
    


    render() {
        return (
            <>
          <Container className = "justify-content-between">
            <Row className = "d-flex text-center  ">
       
        <Col lg ={2} >
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
        
            {/* <Col lg={10}>
      {this.state.projects.map(pro =>
         
     <Table striped bordered hover className = "w-80 ml-5 justify-content-between">
      <thead>
        <tr>
          <th>projectId</th>
          <th>Name</th>
          <th>Description</th>
          <th>REPOURL</th>
          <th>LiveURL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{pro._id}</td>
          <td>{pro.name}</td>
          <td>{pro.descripton}</td>
          <td>{pro.repoURL}</td>
          <td>{pro.liveURL}</td>
        </tr>
      </tbody>
    </Table>  
    
            )}
              </Col>
          */}
            
         </Row>
         </Container>
         </>
      
        
    )
}            
    
 }

export default withRouter(Details)