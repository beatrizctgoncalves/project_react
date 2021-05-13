'use strict'

const { request } = require('express');
const fetch = require('node-fetch');


function database(requests, pgResponses) {
    const dt = {

        request1 : require('../services/apis-db-requests')(fetch,pgResponses),

        createUser: function(username,name,surname) { //TODO
            var requestBody = JSON.stringify({
                "username": username,
                "name": name,
                "surname" : surname,
                "info": {}
            });
            console.log(this.request1);

            return fetch(`http://localhost:9200/users/_doc`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .catch(() => {
                    console.log("nop");
                   return  pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG)
                });
            
            /*
            
            return this.request1.makeFetchElastic('users/_doc', arrayMethods.POST, requestBody)
                .then(() =>{
                    console.log("cria?");
                    return username} )
                .catch(() => {
                    console.log("nop");
                   return  pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG)})
              */     
        },

        getUser: function(username) {

            
            return this.getRawUser(username).then(body => {
                console.log("SUCCESS")
                if(body.hits && body.hits.hits.length) return body.hits.hits.map(hit => hit._source)[0];
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
            })
            .catch(error=> {
                console.log("ERROR")
                 if(error.status == pgResponses.NOT_FOUND) return error
                 else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                });




            /*
            return makeFetch(`users/_search?q=username:${username}`, arrayMethods.GET, null)
                .then(body => {
                    if(body.hits && body.hits.hits.length) return body.hits.hits.map(hit => hit._source)[0];
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                })
                .catch(error => {
                    if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                })

                */
        },

        getRawUser : function(username){

            return fetch(`http://localhost:9200/users/_search?q=username:${username}`, {
                method: 'GET',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: null //Request body
            }).then(res => res.json())

        },

        updateUser: function(username, firstName, lastName) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": "ctx._source.name = params.name; ctx._source.description = params.description",
                    "params": {
                        "firstName": firstName, 
                        "lastName": lastName
                    }
                }
            });
            return this.getRawUser(username).then(body=>{
                const id =  body.hits.hits.map(hit => hit._id);
                return fetch(`http://localhost:9200/groups/_update/${id}`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: requestBody 
                }).then(res => res.json).then(body =>{
                    if(body.result == 'updated') {
                        return body._id;
                    } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);

                }).catch(error => {
                    if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                })

            });
            /*
            
            makeFetch(`groups/_update/${id}`, arrayMethods.POST, requestBody)
                .then(body => {
                    if(body.result == 'updated') {
                        return body._id;
                    } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
                })
                .catch(error => {
                    if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                })
                */
        },

        deleteUser: function(username) {
            console.log("INICIO DO FETCH");

            return this.getRawUser(username).then(body => {
                const id =  body.hits.hits.map(hit => hit._id);
                return fetch(`http://localhost:9200/users/_doc/${id}`, {
                    method: 'DELETE',
                    headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                        'Content-Type': 'application/json'
                    },
                    body: null //Request body
                }).then(res => res.json()).then(body => {
                    if(body.result === 'deleted') return body.username
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                })
                .catch(error=> {
                    if(error.status == pgResponses.NOT_FOUND) return error
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                    });
            })
        }
    }
    return dt;
}

module.exports = database;