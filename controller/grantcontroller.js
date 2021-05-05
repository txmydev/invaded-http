const express = require('express');
const app = express();
const Grant = require('../model/grant');

app.get('/', async (req, res) => {
   let grants = await Grant.find(req.query);
   if(!grants.length) return res.status(404).send({message: 'Not found.'})

    res.status(200).send(grants);
});

app.post('/', async (req, res) => {
    create(req, res);
})

app.delete('/', async (req, res) => {
    let grants = await Grant.find(req.body);
    if(!grants.length)  return res.status(404).send({message: 'Not found.'});

    remove(grants, req, res);
})

async function remove(grants, req, res) {
    await grants.forEach(grant => grant.remove());
    res.status(200).send(grants);
}

async function create(req, res) {
    let grant = await new Grant(req.body)

    await grant.save(error => {
        if(error) res.status(500).send({message: 'Internal error'});
        else res.status(201).send(grant);
    })

  //
}

module.exports = app;