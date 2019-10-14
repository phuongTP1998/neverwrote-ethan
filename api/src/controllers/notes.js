const express = require("express");
const _ = require("lodash");
const models = require("../models");

const router = express.Router();

function noteFilter(obj, opt) {
  if(opt == 1){
    return _.pick(obj, ["notebookId", "title", "content"]);
  } else {
    return _.pick(obj, ["title", "content"]);
  }
}

/* *** TODO: Fill in the API endpoints for notes *** */
router.get("/", (req, res) => {
  models.Note.findAll({ order: [["createdAt", "DESC"]] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post("/", (req, res) => {
  models.Note.create(noteFilter(req.body, 1))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ err: error.message }));
});

router.get("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ err: error.message }));
});

router.delete("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ err: error.message }));
});

router.put("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.update(noteFilter(req.body, 0)))
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ err: error.message }));
})

module.exports = router;
