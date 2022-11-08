import express from "express";
import errorResponses from "../errors/erros.custom";

/**This grabs query params from our get request and inserts them to the request body */
const handlePurchaseQuery = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, quantity, amountJSON } = req.query;
    //Confirm if all query params are present
    if (!id || !quantity || !amountJSON) { //Check if all required info is available
        throw new errorResponses.BadRequest(`Please provide all required info:: id,quantity,amount`);
    }
    req.body = { ...req.body, id, quantity, amountJSON };
    next();
};

export default handlePurchaseQuery;