const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const extractedErrors = errors.mapped();

		Object.keys(errors.mapped()).map(key => {
			return res.status(422).json({success: false, message: extractedErrors[key]['msg']});
		});
	}

	return next();
}