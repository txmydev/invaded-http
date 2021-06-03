const express = require('express');
const app = express();
const rank = require('../model/rank');

/*app.get('/', (req, res) => {
    rank.find(req.query)
        .then(
            ranks => {
                if(!ranks.length) return res.status(204).send({message: 'No content'})

                res.status(200).send(ranks)
            }
        )
})*/

app.post('/all', async (req, res) => {
    if(!Array.isArray(req.body)) return res.status(400).send({message: 'This uses an array.'})

    for (const eachRank of req.body) {
        console.log(eachRank)
        let nrank = await new rank(eachRank)

        await nrank.save(error => {
            if(error){
                console.log(error);
                res.status(500).send({message: 'Internal error'});
            }
        })
    }

    res.status(201).send(req.body)
})

app.post('/', async (req, res) => {
    let ranks = await rank.find({ "name" : `${req.body.name}`, "priority" : `${req.body.priority}`});

    if(!ranks.length) create(req, res);
    else update(ranks[0], req, res);
})

app.delete('/', async (req, res) => {
    let ranks = await rank.find(req.query)
    if(!ranks.length) return res.status(204).send({message: 'No content'})

    ranks.forEach(rank => rank.remove());
    res.status(202).send(ranks);
})

app.get('/', async (req, res) => {
    let ranks = await rank.find(req.query);
    if(!ranks.length) return res.status(204).send({message: 'No Content.'})

    res.status(200).send(ranks);
})

async function create(req, res) {
    let newRank = await new rank(req.body)
    await newRank.save(error => {
        if(error){
            console.log(error);res.status(500).send({message: 'Internal error'});
        }else res.status(201).send(newRank);
    })
}

async function update(rankProvided, req, res) {
    let updated = Object.assign(rankProvided, req.body);

    let rank = await updated.save().catch(error => {
            console.log(error.stackTrace);
            res.status(500).send({message: 'Internal error'}) })

    res.status(200).send(rank);
}

module.exports = app;