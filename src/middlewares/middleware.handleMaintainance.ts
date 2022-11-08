import express from "express";

/**This grabs all the needed query params from our get request and inserts them to the request body */
const handleMaintainanceQuery = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, name, quantity, update, price, deduct, changeJSON } = req.query;
    req.body = { ...req.body, id, name, quantity, update, price, deduct, changeJSON };
    next();
};

export default handleMaintainanceQuery;