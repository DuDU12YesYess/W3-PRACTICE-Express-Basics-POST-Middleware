 
export const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const path = req.path;
    const queryParams = JSON.stringify(req.query);
 
    console.log(`[${timestamp}] ${method} ${path} | Query: ${queryParams}`);
 
    next();
};
 
