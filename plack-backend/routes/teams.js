var models  = require('../models');
var express = require('express');
var router  = express.Router();

//GET all teams
router.get('/', function(req, res) {
  models.Team.findAll().then(function(teams) {
        res.json(teams);
  });
});

//GET team based on ID
router.get('/:id', function(req, res) {
    models.Team.findAll({
        where: {
            team_id: req.params.id
        }
    }).then(function(teams) {
        res.json(teams);
    });
});

module.exports = router;