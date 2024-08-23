const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        console.log("======= Hello Auth Middleware =====");
        console.log("Request Headers:", req.headers); // Log all headers

        // Access 'authorization' in lowercase
        let token = req.headers.authorization; 

        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ msg: "No Valid Auth" });
        }

        // Remove 'Bearer ' from the token if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length); // Remove 'Bearer ' prefix
        } else {
            return res.status(401).json({ msg: "Invalid Token Format" });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decodedToken.id;

        next();
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = { auth };
