const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

function notebookFilter(obj){
  return _.pick(obj, ["title"])
}

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:notebookId/notes', (req, res) => {
  models.Note.findAll({ where : { notebookId: req.params.notebookId }})
    .then(note => res.json(note))
    .catch(err => res.status(500).json({error: err.message}));
})

router.post('/', (req, res) => {
  models.Notebook.create(notebookFilter(req.body))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }))
})

/* *** TODO: Fill in the API endpoints for notebooks *** */

module.exports = router;
