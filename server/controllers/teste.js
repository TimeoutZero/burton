var express = require('express'),
    github = require('octonode'),
    _      = require('underscore'),
    Q      = require('q'),
    router = express.Router();
    
var client = github.client();
var ghrepo = client.repo('pksunkara/octonode');
  
router.route('/test')
    .get((req, res) => {
       
    });
    
var i   = 0;
var issues = [];

function findByLastReleaseDay(date) {
    Q.promise((resolve, reject) => {
        findByRecursiveByDate(date, resolve, reject);
    }).then(() => {
        return issues;
    }).catch((err) => {
        return { message : err }
    })
    .done();
}

function findRecursiveByDate (date) {
    getIssuesFromGithub
        .then(filterValuesBy(date))
        .then((filterIssues) => {
            if (isEmpty(filterIssues)) {
                resolve();
            } else {
                issues.concat(filterIssues);
                return findByLastReleaseDay(date);
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .done()
}

function getIssuesFromGithub(params) {
    return Q.promise((resolve, reject) => {
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

function get(date) {
  return (issues) => {
      
  }  
}
    
module.exports = router;