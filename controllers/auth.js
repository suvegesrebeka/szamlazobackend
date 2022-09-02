const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');


const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())return 
    
    const nev = req.body.nev;
    const felhasznalonev = req.body.felhasznalonev;
    const jelszo = req.body.jelszo;

    try{
        const hashedPassword = await bcrypt.hash(jelszo,12)

        const userDetails = {
            nev:nev,
            felhasznalonev:felhasznalonev,
            jelszo:hashedPassword
        }

        const result = await User.save(userDetails);

        res.status(201).json({message:'User registered'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}
