const database = require("./serverDatabase");
const express = require("express");
const router = express.Router();
const path = require("path");

// get a user's docs
router.get("/fermentation/projects/:userID", async (req, res) => {
  const result = await database
    .getUserProjects(req.params.userID)
    .then((response) => {
      if (response.status) {
        res.status(200).send(response.projects);
      } else {
        res.status(404);
      }
    })
    .catch((error) => console.log(error));
});

// save new doc
router.post("/fermentation/projects", async (req, res) => {
  const result = await database
    .saveNewProject(req.body)
    .then((response) => {
      if (response.status) {
        res
          .status(201)
          .send({
            status: response.status,
            addedProject: response.addedProject,
          });
      } else {
        res.status(400).send(response.status);
      }
    })
    .catch((error) => console.log(error));
});

// mark doc as complete
router.patch("/fermentation/projects", async (req, res) => {
  const result = await database
    .updateStatus(req.body)
    .then((response) => {
      if (response === 1) {
        res.status(200);
      } else {
        res.status(400);
      }
    })
    .catch((error) => console.log(error));
});

// update a doc
router.patch("/fermentation/projects/update", async (req, res) => {
  const result = await database
    .updateProject(req.body.id, req.body.project)
    .then((response) => {
      if (response.status) {
        res.status(200).send(response);
      } else {
        res.status(400).send(response);
      }
    })
    .catch((error) => console.log(error));
});

// delete a doc
router.delete("/fermentation/projects", async (req, res) => {
  const result = await database
    .deleteProject(req.body)
    .then((response) => {
      if (response === 1) {
        res.status(200).send(response.status);
      } else {
        res.status(400).send(response.status);
      }
    })
    .catch((error) => console.log(error));
});

// catch all
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

module.exports = router;
