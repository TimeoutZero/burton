var express       = require('express'),
    moment        = require('moment'),
    githubService = require('../models/github.service.js')
    router        = express.Router();
    
router
    .route('/test')
        .get((req, res) => {
            ghrepo.issues((err, data) => {
                res.send(data);
            })
        });
        
router
    .route('/test/issues')
        .get((req, res) => {
            githubService.findByLastReleaseDay(moment('2016-02-19T19:46:28Z')) 
                .then((issues) => {
                    res.send(issues);
                }).catch((err) => {
                    res.send(err)
                })
                .done();
           
        });
    
module.exports = router;