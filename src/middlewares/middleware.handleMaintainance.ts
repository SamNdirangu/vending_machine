import express from "express";

const handleMaintainanceQuery = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, name, quantity, price, deduct, changeJSON } = req.query;
    req.body = { ...req.body, id, name, quantity, price, deduct, changeJSON };
    next();
};

export default handleMaintainanceQuery;