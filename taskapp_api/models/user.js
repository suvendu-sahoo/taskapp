const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        token: { type: String }
    },
    {
        timestamps: true
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id, 
        email: this.email
    }, process.env.JWT_SECRET_KEY, {expiresIn: Number(process.env.JWT_EXPIRES_IN)});
    
    return token;
};

module.exports = mongoose.model('user', userSchema);