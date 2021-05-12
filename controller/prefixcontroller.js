const express = require('express');
const app = express();
const Prefix = require("../model/prefix")

app.get('/', async (req, res) => {
    let prefixs = await Prefix.find(req.query);
    if(!prefixs.length) return res.status(404).send({message: 'Not found.'})

    res.status(200).send(prefixs);
});

app.post('/', async (req, res) => {
    let prefixs = await Prefix.find({ "id" : `${req.body.id}`});

    if(!prefixs.length) create(req, res);
    else update(prefixs[0], req, res);
})

app.delete('/', async (req, res) => {
    let prefixs = await Prefix.find(req.query);
    if(!prefixs.length)  return res.status(404).send({message: 'Not found.'});

    remove(prefixs, req, res);
})

async function remove(prefixs, req, res) {
    await prefixs.forEach(prefix => prefix.remove());
    res.status(200).send(prefixs);
}

async function create(req, res) {
    let prefix = await new Prefix(req.body)
    await prefix.save(error => {
        if(error){
            console.log(error);res.status(500).send({message: 'Internal error'});
        }else res.status(201).send(prefix);
    })
}

async function update(prefix, req, res) {
    let newPrefix = await Object.assign(prefix, req.body).save().catch(error => {
        console.log(error.stackTrace);
        res.status(500).send({message: 'Internal error'}) })

    res.status(200).send(newPrefix);
}

module.exports = app;