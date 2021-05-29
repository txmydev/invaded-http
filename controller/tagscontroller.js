const express = require('express');
const app = express();
const Tag = require("../model/tag")

app.get('/', async (req, res) => {
    let tags = await Tag.find(req.query);
    if(!tags.length) return res.status(404).send({message: 'Not found.'})

    res.status(200).send(tags);
});

app.post('/', async (req, res) => {
    let tags = await Tag.find({ "id" : `${req.body.id}`});

    if(!tags.length) create(req, res);
    else update(prefixs[0], req, res);
})

app.delete('/', async (req, res) => {
    let tags = await Tag.find(req.query);
    if(!tags.length)  return res.status(404).send({message: 'Not found.'});

    remove(tags, req, res);
})

app.delete('/deleteall', async (req, res) => {
    let tags = await Tag.find();

    await tags.forEach(prefix => prefix.remove(err => {
        if(err) {
            console.log(err)
            res.status(500).send({message: 'not ok'})
        }
    }))

    res.status(200).send({message: 'ok'})
})

async function remove(tags, req, res) {
    await tags.forEach(tag => tag.remove());
    res.status(200).send(tags);
}

async function create(req, res) {
    let tag = await new Tag(req.body)
    await tag.save(error => {
        if(error){
            console.log(error);res.status(500).send({message: 'Internal error'});
        }else res.status(201).send(tag);
    })
}

async function update(tag, req, res) {
    let newTag = await Object.assign(tag, req.body).save().catch(error => {
        console.log(error.stackTrace);
        res.status(500).send({message: 'Internal error'}) })

    res.status(200).send(newTag);
}

module.exports = app;