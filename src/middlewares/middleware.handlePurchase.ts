import express from "express";
import errorResponses from "../errors/erros.custom";
const handlePurchaseQuery = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, quantity, amount } = req.query
    //Confirm if all query params are present
    if (!id || !quantity || !amount) { //Check if all required info is available
        throw new errorResponses.BadRequest(`Please provide all required info`)
    }
    req.body = { ...req.body, id, quantity, amount }
    next()
}

export default handlePurchaseQuery;