const express = require('express');
const app = express();
const Profile = require('../model/profile');

async function create(req, res) {
    let profile = await new Profile(req.body)

    await profile.save(error => {
        if(error) {
            res.status(500).send({message: 'Internal error'})
            console.log(error);
        }else res.status(201).send(profile);
    })

}

app.post('/', async (req, res) => {
    let found = await Profile.find({"uuid": `${req.body.uuid}`, "name": `${req.body.name}`});

    if (!found.length) create(req, res);
    else update(found[0], req, res);
})

async function update(found, req, res) {
    let profile = await Object.assign(found, req.body).save()
        .catch(error => { console.log(error); res.status(500).send({message: 'Internal error.'})})

    return res.status(200).send(profile);
}



app.get('/', (req, res) => {
    Profile.find(req.query)
        .then(found => {
            if(!found.length) res.status(204).send({message: 'No content'})
            else res.status(200).send(found);
        });
})

app.delete('/', (req, res) => {
    let profiles = Profile.find(req.query);
    if(!profiles.length) return res.status(204).send({message: 'Could not found any profiles with that values.'})

    profiles.forEach(profile => profile.remove());
    res.status(200).send(profiles);
})

module.exports = app;