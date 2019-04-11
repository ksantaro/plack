var models  = require('../models');
var express = require('express');
var router  = express.Router();

// const {createUser, createLoginFunction, createWorkspace} = require('./common');
const {createWorkspace, createUser, createLoginFunction} = require('./common');

//GET all workspaces
router.get('/', function(req, res) {
  models.Workspace.findAll().then(function(workspaces) {
        res.json(workspaces);
  });
});

//GET workspace based on ID
router.get('/id/:id', function(req, res) {
    models.Workspace.findAll({
        where: {
            workspace_id: req.params.id
        }
    }).then(function(workspaces) {
        res.json(workspaces);
    });
});

//GET workspace based on workspace_url
router.get('/workspace-url/:workspace_url', function(req, res) {
    models.Workspace.findOne({
        where: {
            workspace_url: req.params.workspace_url
        }
    }).then(function(workspaces) {
        // if(workspaces.length === 0) {
        //     res.error("workspace-url does not exsit");
        // }
        res.json(workspaces);
    });
});

router.post('/create', createWorkspace, createUser, createLoginFunction, (req,res) => {
});

module.exports = router;