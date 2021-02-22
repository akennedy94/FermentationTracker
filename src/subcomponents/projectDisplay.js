import React, { useState, useEffect, useContext } from 'react';
import { Container,  Button, Row, Col, Card } from 'react-bootstrap';
import { ContextConsumer } from '../Context.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { compareDesc, format, parseISO } from 'date-fns';
import { Link } from "react-router-dom";
import '../css/projectDisplay.css';

const ProjectDisplay = ({  projectState, setSelectedProject }) => {
    const context = useContext(ContextConsumer);
    const [projects, setProjects, setEdit] = [context.projects, context.setProjects, context.setEdit];
    const filter = projects.filter(project => project.active === projectState);
  
    // sets project status to complete
    const handleStatusChange = (e) => {
      const confirm = window.confirm("Mark project as completed?");
      if (confirm === true) {
        const setStatus = axios.patch('/fermentation/projects', {id: e.target.id})
          .then(response => console.log(response))
          .catch(error => console.log(error));
  
        const index = projects.findIndex(project => project._id === e.target.id);
        projects[index].active = false;
  
        setProjects([...projects]);
  
        toast.success("Project moved to archive!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        })
  
      }
    }
  
    // Set form to edit
    const handleEditClick = (project) => {
      setSelectedProject(project);
      setEdit(true);
    }
  
    // deletes project from database
    const handleDelete = (e) => {
      const confirm = window.confirm("Are you sure you want to delete this project?");
        if (confirm === true) {
          const deleteProject = axios.delete('/fermentation/projects', {data: {id: e.target.id}})
            .then(response => console.log(response))
            .catch(error => console.log(error));
  
          const updatedProjects = projects.filter(project => project._id !== e.target.id);
          setProjects(updatedProjects);
          
          toast.success("Project Deleted!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          })
        }
    }
  
    return (
      <Container style={{height: "100rem"}}>
        <Row>
          {
            filter.length === 0 ? 
              <Col className="d-flex justify-content-center">
                <EmptyCard projectState={projectState}/>
              </Col>
            :
            filter.map(project => {
              return <ProjectCard project={project} handleStatusChange={handleStatusChange} handleDelete={handleDelete} handleEditClick={handleEditClick}/>
            })
          }
        </Row>
      </Container>
    )
  }
  
  const ProjectCard = ({project, handleStatusChange, handleDelete, handleEditClick}) => {
    const [pastDue, setPastDue] = useState(false);
    
    // check to see if before or after due date
    const checkDate = (projectDate) => {
      const today = format(new Date(), "yyyy-MM-dd");
      const projectDue = format(parseISO(projectDate), "yyyy-MM-dd");
  
      if (compareDesc(parseISO(today), parseISO(projectDue)) < 0) {
        setPastDue(true);
      }
    }
  
    // set pastDue state on component mount 
    useEffect(() => {checkDate(project.time)}, []);

    return (
        <Col className="project-col">
            <Card key={project._id} >
                <Card.Header>
                    {pastDue && project.active ? <i className="fas fa-exclamation mr-4 mt-1" style={{color: "red", fontSize: "1.5rem"}} title="This project is past due!"/> : null}
                    <Card.Title className="mt-1">{project.projectName}</Card.Title>
                </Card.Header>
                    
                <Card.Body>
                    <Card.Text className="text-left">
                    <strong>Description:</strong> {project.description} <br/>
                    <strong>Total Dry Weight (g):</strong> {project.weight} g <br/>
                    <strong>Salt Percentage:</strong> {project.saltPercentage}% <br/>
                    <strong>Total Salt:</strong> {project.saltWeight} g <br/>
                    {project.active ? <div><strong>Complete on:</strong> {project.time}<br/></div> : <div><strong>Completed on:</strong> {project.time}<br/></div>}
                    <strong>Notes:</strong><br/> {project.notes === "" ? "N/A" : project.notes}
                    </Card.Text>
                    <Row className="mt-4 btn-row">
                        <Col className="btn-col">
                            {
                            project.active ? <Button className="ut-btn" onClick={handleStatusChange} 
                            id={project._id}>Complete Project</Button> : null
                            }
                        </Col>
                        <Col className="btn-col">
                            <Button variant="danger" className="ut-btn" onClick={handleDelete} id={project._id}>Delete Project</Button>
                        </Col>
                        <Col className="btn-col">
                            {
                            project.active ? 
                                <Link to="/">
                                    <Button variant="warning" className="ut-btn" onClick={() => handleEditClick(project)}
                                    id={project._id}>Edit Project</Button>
                                </Link>
                            : null
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
      )
  }
  
  const EmptyCard = ({ projectState }) => {
    return (
      <Card id="empty-card">
        <Card.Header className="empty-header">
          <Card.Title className="mt-2">You haven't {projectState ? "added" : "archived"} any projects yet!</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            This page will contain projects {projectState ? "you're currently working on!" : "you've completed and archived!" }. <br></br>
            {projectState ? "You can start tracking projects by filling out the form!" : "You can complete and archive a project in the active projects screen!"}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  export default ProjectDisplay