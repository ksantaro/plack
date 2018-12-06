var models  = require('../models');
var express = require('express');
var router  = express.Router();


//GET all workspaces
router.get('/', function(req, res) {
  models.Workspace.findAll().then(function(workspaces) {
        res.json(workspaces);
  });
});

//GET workspace based on ID
router.get('/:id', function(req, res) {
    models.Workspace.findAll({
        where: {
            workspace_id: req.params.id
        }
    }).then(function(workspaces) {
        res.json(workspaces);
    });
});

module.exports = router;