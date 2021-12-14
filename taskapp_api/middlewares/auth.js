const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        
        if (!token) {
            return res.status(500).json({success: false, message: 'Authentication token is required.'});
        } 
        
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        next();
    } catch (err) {
        return res.status(500).json({success: false, message: 'Error in authenticating user.', error: err});
    }
};