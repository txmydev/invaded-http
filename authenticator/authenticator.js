const jwt = require('jsonwebtoken');

function forbidden(req, res) {
    return res.status(403).send({message: 'No permission.'})
}

module.exports = (req, res, next) => {
    if(!req.headers.authorization) return forbidden(req, res);

    const authorization = req.headers.authorization.split(' ')[1];

    jwt.verify(authorization, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err) return forbidden(req, res);
        return next();
    })
}