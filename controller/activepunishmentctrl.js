const express = require('express');
const app = express();
const punishment = require('../model/activepunishment');

app.get('/', async (req, res) => {
    let punishments = await punishment.find(req.query);
    if(!punishments.length) return res.status(204).send({message: 'No content'})

    res.status(200).send(punishments);
})

app.post('/', async (req, res) => {
    let punishments = await punishment.find(req.body);

    if(!punishments.length) create(req, res);
    else update(punishments[0], req, res);
})

app.delete('/', async (req, res) => {
    let punishments = await punishment.find(req.query);
    if(!punishments.length) return res.status(404).send({message: 'Not found'});

    remove(punishments, req, res);
})

async function remove(punishments, req, res) {
    punishments.forEach(punishment => punishment.remove());
    res.status(202).send(punishments);
}

async function create(req, res) {
    let newPunishment = await new punishment(req.body)
    await newPunishment.save(error => {
       if(error) res.status(500).send({message: 'Internal error'})
        else res.status(201).send(newPunishment);
    })


}

async function update(oldPunishment, req, res) {
    let punishment = Object.assign(oldPunishment, req.body);
    await punishment.save().catch(error => {console.log(error); res.status(500).send({message: 'Internal error'})})
    res.status(200).send(punishment);
}

module.exports = app;