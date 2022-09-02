const bodyParser = require('body-parser');

const express = require('express');

const {body} = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth')

const router = express.Router();

router.post(
    '/signup',
    [
        body('nev').trim().not().isEmpty(),
        body('felhasznalonev').trim().not().isEmpty()
        .custom(async(felhasznalonev) => {
            const user = await User.find(felhasznalonev);
            if (user[0].length>0){
                return Promise.reject('Felhasználo már létezik!')
            }
        }),
        body('jelszo').trim().isLength({min:7})
    ],authController.signup
);

module.exports = router;
