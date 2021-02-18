import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FormInput from './inputs/FormInput';
import NotesInput from './inputs/NotesInput';
import axios from 'axios';
import { compareDesc, format, parseISO } from 'date-fns'
import { Container, Form, Button, Row, Col, Navbar, Nav, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(<App />, document.getElementById('root'));

toast.configure();

function App() {
  const [projects, setProjects] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const activeProjects = projects.filter(project => project.active === true).length;
  const archivedProjects = projects.filter(project => project.active === false).length;

  async function getProjects () {
    const getProjects = await axios.get('/fermentation/projects')
      .then(response => {setProjects(response.data)})
      .catch(error => console.log(error));
  }

  useEffect(() => {getProjects()}, []);

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Fermentation Tracker</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link><Link to="/">Project Form</Link></Nav.Link>
          <Nav.Link><Link to="/active">{activeProjects} Active Projects</Link></Nav.Link>
          <Nav.Link><Link to="/archive">{archivedProjects} Archived Projects</Link></Nav.Link>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/" component={() => <ProjectForm projects={projects} setProjects={setProjects} setEdit={setEdit} edit={edit} selectedProject={selectedProject}/>} />
        <Route exact path="/active" component={() => <ProjectDisplay projects={projects} setProjects={setProjects} setEdit={setEdit} setSelectedProject={setSelectedProject} projectState={true} />} />
        <Route exact path="/archive" component={() => <ProjectDisplay projects={projects} setProjects={setProjects} projectState={false} />} />
      </Switch>
    </Router>
  );
}

function ProjectForm ({ projects, setProjects, setEdit, edit, selectedProject }) {
  const [projectName, setProjectName] = useState(null);  
  const [description, setDescription] = useState(null);
  const [weight, setWeight] = useState(null);
  const [saltPercentage, setSaltPercentage] = useState(null);
  const [saltWeight, setSaltWeight] = useState(null);
  const [time, setTime] = useState(null);
  const [notes, setNotes] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const fields = [
    {element: document.getElementById("project")},
    {element: document.getElementById("description")},
    {element: document.getElementById("weight")},
    {element: document.getElementById("salt")},
    {element: document.getElementById("time")}
  ]

  // validate form inputs
  const validateForm = () => {
    let formValid = true;
    fields.forEach(field => field.element.classList.remove("form-error"));
    
    if (projectName === null) {
      fields[0].element.classList.add("form-error");
      formValid = false;
    }
    if (description === null) {
      fields[1].element.classList.add("form-error");
      formValid = false;
    }
    if (weight === null) {
      fields[2].element.classList.add("form-error");
      formValid = false;
    }
    if (saltPercentage === null) {
      fields[3].element.classList.add("form-error");
      formValid = false;
    }
    if (time === null) {
      fields[4].element.classList.add("form-error");
      formValid = false;
    }
    
    return formValid;
  }

  // build project object if validation sucessful
  const buildProject = () => {
    if (validateForm() === true) {
      const newProject = {
        projectName: projectName,
        description: description,
        weight: weight,
        saltPercentage: saltPercentage,
        saltWeight: saltWeight,
        time: time,
        active: true,
        notes: notes
      }
      return {built: true, newProject: newProject};
    } else {
      window.alert('Please fill out all of the fields!');
      return {built: false};
    }
  }
    
  // handle form button submitting new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = buildProject();

    if (project.built) {
      addProject(project.newProject)
        .then(response => setProjects([...projects, response]));

      toast.success("Project Added!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });

      handleReset();
    }
  }
  
  // handle form button click for submitting edits
  const handleEdit = async (e) => {
    e.preventDefault();
    const update = buildProject();
    console.log("EDIT BUTTON PRESSED")

    if (update.built){
      updateProject(projectId, update.newProject).then(id => update.newProject._id = id);

      const index = projects.findIndex(project => project._id === projectId);
      const updateLocal = [...projects];
      updateLocal.splice(index, 1, update.newProject);
      setProjects(updateLocal);

      handleReset();
      
      toast.success("Project Updated!", {
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

  // handle canceling edits click
  const handleCancel = () => {
    handleReset();
      
    toast.warning("Updates Canceled!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  }

  // reset form and states to default
  const handleReset = () => {
    if (edit) {
      const button = document.getElementById("formButton");
      button.innerHTML = "Submit";
    }

    fields.forEach(field => field.element.value="");
    fields.forEach(field => field.element.classList.remove("form-error"));

    setEdit(false);
    setProjectName(null);
    setDescription(null);
    setWeight(null);
    setSaltPercentage(null);
    setTime(null);
    setNotes(null);
    setProjectId(null);
  }


  // post new project
  const addProject = async (newProject) => {
    let addedProject;

    await axios.post('/fermentation/projects', newProject)
      .then(response => {
        addedProject = response.data.addedProject;
      }).catch(error => console.log(error));

    return addedProject;
  }

  // post edits to existing project
  const updateProject = async (idToUpdate, updatedProject) => {
    let updatedID;

    await axios.patch('/fermentation/projects/update', {id: idToUpdate, project: updatedProject})
      .then(response => updatedID = response.data.id)
      .catch(error => console.log(error));

    return updatedID;
  }

  // fill form to with project details
  const setFormToEdit = () => {
    if (edit) {
      const button = document.getElementById("formButton");
      button.innerHTML = "Submit Changes";

      setProjectName(selectedProject.projectName);
      setDescription(selectedProject.description);
      setWeight(selectedProject.weight);
      setSaltPercentage(selectedProject.saltPercentage);
      setTime(selectedProject.time);
      setNotes(selectedProject.notes);
      setProjectId(selectedProject._id);
    }
  }
  
  const saltTotal = () => {
    setSaltWeight((weight * (saltPercentage / 100)).toFixed(2));
  }

  useEffect(() => {saltTotal()}, [weight, saltPercentage]);

  useEffect(() => {setFormToEdit()}, [edit]);

  return (
    <div className="section">
        <div className="box">
          <Form id="form">
            <Form.Label className="label">Fermentation Tracker</Form.Label>
              <Row className="mt-2">
                <Col>
                  <FormInput for="project" type="text" title="Project Name" onChange={setProjectName} value={projectName} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <FormInput for="description" type="text" title="Description" onChange={setDescription} value={description} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <FormInput for="weight" type="number" title="Dry Weight of Ferment (g)" onChange={setWeight} value={weight} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <FormInput for="salt" type="number" title="Salt %" onChange={setSaltPercentage} value={saltPercentage} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Calculated Salt Weight (g)</label>
                  <FormInput for="saltWeight" type="number" title="Salt Weight (g)" value={saltWeight} readOnly={true} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Complete on</label>
                  <FormInput for="time" type="date" title="Complete on" onChange={setTime} value={time} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Additional Notes?</label><br/>
                  <NotesInput for="notes" type="text" title="Additional notes" onChange={setNotes} value={notes} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button 
                    size="lg"
                    type="submit" 
                    id="formButton" 
                    onClick={(e) => {
                      if (edit) {
                        handleEdit(e);
                      } else {
                        handleSubmit(e);
                      }
                    }}>Submit</Button>
                </Col>
                <Col>
                  {edit ? <Button variant="danger" size="lg" onClick={() => handleCancel()}>Cancel changes</Button> 
                  : 
                  <Button variant="danger" size="lg" onClick={() => handleReset()}>Clear Form</Button>}
                </Col>
              </Row>
          </Form>
        </div>
    </div>
  )
}

function ProjectDisplay ({ projects, setProjects, projectState, setEdit, setSelectedProject }) {

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
      <Card key={project._id} className="mt-4 ml-4" style={{width: "40rem"}}>
        <Card.Header>
          {pastDue && project.active ? <i className="fas fa-exclamation mr-4 mt-1" style={{color: "red", fontSize: "1.5rem"}} title="This project is past due!"/> : null}
          <Card.Title className="mt-1">{project.projectName}</Card.Title>
        </Card.Header>
          
        <Card.Body>
          <Card.Text className="text-left project-details">
            <strong>Description:</strong> {project.description} <br/>
            <strong>Total Dry Weight (g):</strong> {project.weight} g <br/>
            <strong>Salt Percentage:</strong> {project.saltPercentage}% <br/>
            <strong>Total Salt:</strong> {project.saltWeight} g <br/>
            {project.active ? <div><strong>Complete on:</strong> {project.time}<br/></div> : <div><strong>Completed on:</strong> {project.time}<br/></div>}
            <strong>Notes:</strong><br/> {project.notes === "" ? "N/A" : project.notes}
          </Card.Text>
          <Row className="mt-4">
            <Col>
              {
                project.active ? <Button size="md" onClick={handleStatusChange} 
                id={project._id}>Mark Project As Complete</Button> : null
              }
            </Col>
            <Col>
              <Button variant="danger" size="md" onClick={handleDelete} id={project._id}>Delete Project</Button>
            </Col>
            <Col>
              {
                project.active ? 
                  <Link to="/">
                    <Button variant="warning" size="md" onClick={() => handleEditClick(project)}
                    id={project._id}>Edit This Project</Button>
                  </Link>
                : null
              }
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}

const EmptyCard = ({projectState}) => {
  return (
    <Card id="empty-card">
      <Card.Header>
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