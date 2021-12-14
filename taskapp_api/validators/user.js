const { checkSchema } = require('express-validator');

const UserModel = require('../models/user');

var defaults = {
    password: {
		notEmpty: {
			errorMessage: 'Password is required.'
		},
		isLength: {
	        options: {min: 6},
	        errorMessage: 'Password should be at least 6 chars long.',
	    },
    }
};

exports.register = () => {
 	var options = {
	    name: {
	    	notEmpty: {
				errorMessage: 'Name is required.'
			}
	    },
	    email: {
	    	notEmpty: {
				errorMessage: 'Email is required.'
			},
			isEmail: {
				errorMessage: 'Email is invalid.'
			},
			custom: {
				options: async (email) => {
					const count = await UserModel.countDocuments({ email });
					
					if (count) {
						throw new Error('Email already exists.')
					}
				}
			}
	    }
 	};

 	return checkSchema(Object.assign({}, options, defaults));
}

exports.login = () => {
	var options = {
	    email: {
	    	notEmpty: {
				errorMessage: 'Email is required.'
			},
			isEmail: {
				errorMessage: 'Email is invalid.'
			}
	    }
	};

	return checkSchema(Object.assign({}, options, defaults));
}