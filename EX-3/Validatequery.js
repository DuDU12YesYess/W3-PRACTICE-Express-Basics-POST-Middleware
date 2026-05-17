export const validateQueryMiddleware = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;
 
    // Check if minCredits or maxCredits are present and validate they are integers
    if (minCredits !== undefined) {
        const minNum = Number(minCredits);
        if (isNaN(minNum) || !Number.isInteger(minNum)) {
            return res.status(400).json({ 
                error: "minCredits must be a valid integer" 
            });
        }
    }
 
    if (maxCredits !== undefined) {
        const maxNum = Number(maxCredits);
        if (isNaN(maxNum) || !Number.isInteger(maxNum)) {
            return res.status(400).json({ 
                error: "maxCredits must be a valid integer" 
            });
        }
    }
 
    // Validate that minCredits <= maxCredits if both are present
    if (minCredits !== undefined && maxCredits !== undefined) {
        const minNum = Number(minCredits);
        const maxNum = Number(maxCredits);
 
        if (minNum > maxNum) {
            return res.status(400).json({ 
                error: "Invalid credits range: minCredits cannot be greater than maxCredits" 
            });
        }
    }
 
    next();
};
