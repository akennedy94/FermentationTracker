const nedb = require("nedb");
const activeDB = new nedb();

exports.saveNewProject = async (project) => {
  return new Promise((resolve, reject) => {
    activeDB.insert(project, (err, newProject) => {
      if (err) reject(err);
      if (newProject) resolve({ status: true, addedProject: newProject });
    });
  }).catch((error) => console.log(error));
};

exports.getAllProjects = async () => {
  return new Promise((resolve, reject) => {
    activeDB.find({}, (err, projects) => {
      if (err) reject(err);
      if (projects) resolve({ status: true, projects: projects });
    });
  }).catch((error) => console.log(error));
};

exports.updateStatus = async (idToUpdate) => {
  return new Promise((resolve, reject) => {
    activeDB.update(
      { _id: idToUpdate.id },
      { $set: { active: false } },
      {},
      (err, updatedDoc) => {
        if (err) reject(err);
        if (updatedDoc) resolve({ updatedDoc: updatedDoc, id: idToUpdate.id });
      }
    );
  }).catch((error) => console.log(error));
};

exports.updateProject = async (idToUpdate, updatedProject) => {
  return new Promise((resolve, reject) => {
    activeDB.update(
      { _id: idToUpdate },
      {
        $set: {
          projectName: updatedProject.projectName,
          description: updatedProject.description,
          weight: updatedProject.weight,
          saltPercentage: updatedProject.saltPercentage,
          time: updatedProject.time,
          notes: updatedProject.notes,
        },
      },
      {},
      (err, updatedDoc) => {
        if (err) reject(err);
        if (updatedDoc)
          resolve({ status: true, updatedDoc: updatedDoc, id: idToUpdate });
      }
    );
  }).catch((error) => console.log(error));
};

exports.deleteProject = async (idToDelete) => {
  return new Promise((resolve, reject) => {
    activeDB.remove({ _id: idToDelete.id }, {}, (err, projectDeleted) => {
      if (err) reject(err);
      if (projectDeleted) resolve(projectDeleted);
    });
  }).catch((error) => console.log(error));
};
