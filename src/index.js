import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import FormInput from './inputs/FormInput';
import NotesInput from './inputs/NotesInput';
import ProjectDisplay from './subcomponents/ProjectDisplay.js';
import LandingPage from './subcomponents/LandingPage.js';
import axios from 'axios';
import {  Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ContextConsumer, ContextProvider } from './Context.js';

toast.configure();

const App = () => {
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
      <ContextProvider value={{projects, setProjects, setEdit}}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Fermentation Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/projectForm">Project Form</Nav.Link>
            <Nav.Link href="/active">{activeProjects} Active Project{activeProjects === 1 ? "" : "s"}</Nav.Link>
            <Nav.Link href="/archive">{archivedProjects} Archived Project{archivedProjects === 1 ? "" : "s"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/" component={() => <LandingPage />} />
        <Route exact path="/projectForm" component={() => <ProjectForm edit={edit} selectedProject={selectedProject} />} />
        <Route exact path="/active" component={() => <ProjectDisplay  setSelectedProject={setSelectedProject} projectState={true} />} />
        <Route exact path="/archive" component={() => <ProjectDisplay projectState={false} />} />
      </Switch>
      </ContextProvider>
    </Router>
  );
}

const ProjectForm = ({ edit, selectedProject }) => {
  const context = useContext(ContextConsumer);
  const [projects, setProjects, setEdit] = [context.projects, context.setProjects, context.setEdit];
  const [projectName, setProjectName] = useState(null);  
  const [description, setDescription] = useState(null);
  const [weight, setWeight] = useState(null);
  const [saltPercentage, setSaltPercentage] = useState(null);
  const [saltWeight, setSaltWeight] = useState(null);
  const [time, setTime] = useState(null);
  const [notes, setNotes] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // validate form inputs
  const validateForm = () => {
    if (projectName !== null 
      && description !== null 
      && weight !== null 
      && saltPercentage !== null 
      && time !== null) {
        return true;
      }
    return false;
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
    setSubmitted(true);
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
  
  // handle submit button click in edit state
  const handleEdit = async (e) => {
    e.preventDefault();
    const update = buildProject();

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
    setSubmitted(false);
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
                  <FormInput for="project" type="text" title="Project Name" onChange={setProjectName} errorPresent={submitted && projectName === null} value={projectName} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                   <FormInput for="description" type="text" title="Description" onChange={setDescription} errorPresent={submitted && description === null} value={description} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <FormInput for="weight" type="number" title="Dry Weight of Ferment (g)" onChange={setWeight} errorPresent={submitted && weight === null} value={weight} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <FormInput for="salt" type="number" title="Salt %" onChange={setSaltPercentage} errorPresent={submitted && saltPercentage === null} value={saltPercentage} />
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
                  <FormInput for="time" type="date" title="Complete on" onChange={setTime} errorPresent={submitted && time === null} value={time} />
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
                    className="ut-btn"
                    type="submit" 
                    id="formButton" 
                    onClick={(e) => {
                      if (edit) {
                        handleEdit(e);
                      } else {
                        handleSubmit(e);
                      }
                    }}>{edit ? "Submit Edits" : "Submit"}</Button>
                </Col>
                <Col>
                  {edit ? <Button className="ut-btn" variant="danger" size="lg" onClick={() => handleCancel()}>Cancel changes</Button> 
                  : 
                  <Button className="ut-btn" variant="danger" size="lg" onClick={() => handleReset()}>Clear Form</Button>}
                </Col>
              </Row>
          </Form>
        </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));