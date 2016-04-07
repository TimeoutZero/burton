'use strict'

var github = require('octonode'),
    _ = require('underscore'),
    Q = require('q'),
    moment = require('moment');

class GithubService {

    constructor() {
        this.i = 1;
        this.issues = [];
        this.client = github.client();
        this.ghrepo = this.client.repo('pksunkara/octonode');
    }

    findByLastReleaseDay(date) {
        return Q.promise((resolve, reject) => {
            this.findRecursiveByDate(date, resolve);
        }).then(() => {
            var result = this.issues;
            this.issues = [];
            this.i = 1;

            return result;
        });
    }

    findRecursiveByDate(date, resolve) {
        this.gitIssues()
            .then(this.filterValuesBy(date))
            .then((filterIssues) => {
                if (!_.isEmpty(filterIssues)) {
                    this.issues = this.issues.concat(filterIssues);
                    return this.findRecursiveByDate(date, resolve);
                } else {
                    resolve();
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .done()
    }

    gitIssues() {
        return Q.promise((resolve, reject) => {
            console.log(`page: ${this.i} `);
            this.ghrepo.issues(this.i, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                    this.i++;
                }
            })
        })
    }

    filterValuesBy(lastReleaseDate) {
        return (issues) => {
            var filterdItems = _.filter(issues, (issue) => {
                return moment(issue.created_at) >= lastReleaseDate;
            })
            return filterdItems;
        }
    }
}

module.exports = new GithubService();