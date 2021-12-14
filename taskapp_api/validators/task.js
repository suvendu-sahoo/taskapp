const { checkSchema } = require('express-validator');

exports.create = () => {
	return checkSchema({
	    name: {
			notEmpty: {
				errorMessage: 'Name is required.'
			}
	    },
	    deadline: {
	    	notEmpty: {
				errorMessage: 'Deadline is required.'
			},
			isISO8601: {
				errorMessage: 'Deadline is invalid.'
			}
	    },
	    priority: {
			notEmpty: {
				errorMessage: 'Priority is required.'
			},
			isIn: {
				options: [['1', '2', '3']],
				errorMessage: 'Priority value is invalid.'
			}
	    },
 	})
}

exports.updateStatus = () => {
	return checkSchema({
	    isCompleted: {
			notEmpty: {
				errorMessage: 'Flag is required.'
			}
	    }
 	})
}