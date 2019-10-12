const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */
router.get("/", (req, res) => {
  models.Note.findAll({ order: [["createdAt", "DESC"]] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
