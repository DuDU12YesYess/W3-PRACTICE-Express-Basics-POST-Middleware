// just simple key token that acceptable
const VALID_TOKENS = ['xyz123', 'token456', 'secure789'];
 
export const authMiddleware = (req, res, next) => {
    const { token } = req.query;
 
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ 
            error: "Unauthorized: Missing token. Please provide a valid token as a query parameter (e.g., ?token=xyz123)" 
        });
    }
 
    // Check if token is valid
    if (!VALID_TOKENS.includes(token)) {
        return res.status(401).json({ 
            error: "Unauthorized: Invalid token" 
        });
    }
 
    next();
};
 
