const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');

/*
|   User register
*/
exports.register =  async (req, res, next) => {
    const {name, email, password} = req.body;

    const userData = new UserModel({
        _id: new mongoose.Types.ObjectId,
        name,
        email,
        password: bcrypt.hashSync(password, Number(process.env.SALT))
    });

    userData.save()
    .then(user => {
        return res.status(201).json({success: true, message: 'User registered successfully.', data: user});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in creating user.'});
    });
};

/*
|   User login
*/
exports.login =  async (req, res, next) => {
    const {email, password} = req.body;

    UserModel.findOne({ email })
    .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
            user.token= user.generateAuthToken()
        
            return res.status(200).json({success: true, message: 'User logged in successfully.', data: user});
        }

        return res.status(500).json({success: false, message: 'Invalid user credentials.'});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in finding user.'});
    });
};

/*
|   User logout
*/
exports.logout =  async (req, res, next) => {
    return res.status(200).json({success: true, message: 'User logged out successfully.'});
};