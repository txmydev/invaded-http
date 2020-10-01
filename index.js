require('custom-env').env('config');

const app = require('express');
const express = app();
const bodyParser = require('body-parser');
const database = require('./database/database');

database.connect();

express.use(bodyParser.json());

const authenticator = require('./authenticator/authenticator');
express.use(authenticator);

// Controllers
const profileCtrl = require('./controller/profilecontroller');
const rankCtrl = require('./controller/rankcontroller');
const punishmentCtrl = require('./controller/punishmentcontroller');
const activePunishmentCtrl = require('./controller/activepunishmentctrl');

express.use('/profiles', profileCtrl);
express.use('/ranks', rankCtrl);
express.use('/punishments', punishmentCtrl);
express.use('/activePunishments', activePunishmentCtrl);

express.listen(process.env.PORT, () => console.log(`Listening in port ${process.env.PORT}`))

module.exports = express;