var express = require('express'),
    github = require('octonode'),
    _      = require('underscore'),
    Q      = require('q'),
    moment = require('moment'),
    router = express.Router();
    
var client = github.client();
var ghrepo = client.repo('pksunkara/octonode');
  
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
            ghrepo.issues((err, data) => {
               findByLastReleaseDay(moment('2016-02-19T19:46:28Z')) 
                    .then(() => {
                        res.send(issues);
                    }).catch((err) => {
                        res.send(err)
                    })
                    .done();
            })
        });
    
var i   = 1;
var issues = [];

function findByLastReleaseDay(date) {
    return Q.promise((resolve, reject) => {
        findRecursiveByDate(date);
        resolve();
    })
}

function findRecursiveByDate (date, resolve, reject) {
    getIssuesFromGithub()
        .then(filterValuesBy(date))
        .then((filterIssues) => {
            if (!_.isEmpty(filterIssues)) {
                issues = issues.concat(filterIssues);
                return findByLastReleaseDay(date);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .done()
}

        
function getIssuesFromGithub() {
    return Q.promise((resolve, reject) => {
        //resolve(getMockIssues());
        console.log(`page: ${i} `);
        ghrepo.issues(i, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
                i++;
            }
        })
    })
}

function filterValuesBy(lastReleaseDate) {
  return (issues) => {
    var filterdItems = _.filter(issues, (issue) => { 
        return moment(issue.created_at) >= lastReleaseDate;
    })
    return filterdItems;
  }  
}

// mock = [
//     { created_at : '2016-02-21T21:13:26Z'}, 
//     { created_at : '2016-02-19T19:46:28Z'}, 
//     { created_at : '2016-02-09T06:29:10Z'}
// ];
    
// function getMockIssues() {
//     if (mock) {
//         var x = mock;
//         mock = null;
//         return x;
//     }
//     return [];
// } 
    
    
module.exports = router;