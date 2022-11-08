import express from 'express';
import { StatusCodes } from "http-status-codes";
import errorResponses from '../errors/erros.custom';
import productsModel from '../models/model.products';
import changeInventory, { ChangeSchema } from "../models/model.change";

//Change Controllers ----------------------------------------------------------------
/**Get the current change inventory*/
const getChangeInventory = async (req: express.Request, res: express.Response) => {
    const changeStatus: ChangeSchema = changeInventory.getChangeStatus();
    res.status(StatusCodes.OK).json({ success: true, changeStatus });
};

/**Update change inventory takes isUpdate bool value to indicate whether to add or subtract from change*/
const updateChangeInventory = async (req: express.Request, res: express.Response) => {
    // isUpdate tells the server to add on top arithmeticalty if false the server sets the amount
    const { update, changeJSON } = req.body;
    if (update == undefined && !changeJSON) {
        throw new errorResponses.BadRequest(`Missing required fields: isUpdate and changeJSON`);
    }
    //parse our changejson and isdeduct
    const isUpdate: boolean = update;
    const change = JSON.parse(changeJSON);
    if (change instanceof Object == false) {
        throw new errorResponses.BadRequest(`Please provide change in the correct JSON format`);
    }

    const changeStatus = changeInventory.updateChange({ isUpdate, changeDenominations: change, deduct: false });
    if (!changeStatus) {
        throw new errorResponses.BadRequest(`Missing required fields: isUpdate and changeJSON`);
    }

    res.status(StatusCodes.OK).json({ success: true, changeStatus });
};



//Product Controllers ----------------------------------------------------------------
/** Create a product slot. Requires quantity, name,price */ //--------------------------------------------------------
const createProductSlot = (req: express.Request, res: express.Response) => {
    const { name, quantity, price } = req.body;
    //Check if all required info is available
    if (!name || !quantity || !price) {
        throw new errorResponses.BadRequest(`Please provide all required info: name,quantity,price`);
    }
    //Ensure correct type
    if (isNaN(quantity) || isNaN(price)) {
        throw new errorResponses.BadRequest(`Please provide required info in correct format`);
    }

    const product = productsModel.create({ name, price, quantity });
    if (!product) {
        throw new errorResponses.BadRequest(`Please provide required info in correct format`);
    }

    res.status(StatusCodes.CREATED).json({ success: true, product });
};

/** Update a product slot price or quantity*/ //--------------------------------------------------------
const updateProductSlot = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const price: number = req.body.price;
    const quantity: number = req.body.quantity;
    //Check if all required info is available
    if (!id || !quantity && !price) {
        throw new errorResponses.BadRequest(`Please provide all required values: id, quantity || price`);
    }
    //Ensure correct type for both 
    if (quantity != undefined && isNaN(quantity)) {
        throw new errorResponses.BadRequest(`Please provide the quantity as number format`);
    }
    if (price != undefined && isNaN(price)) {
        throw new errorResponses.BadRequest(`Please provide the price as number format`);
    }
    const product = productsModel.updateProductSlot({ id, price, quantity });
    res.status(StatusCodes.CREATED).json({ success: true, product });
};

const maintainanceControllers = {
    createProductSlot,
    updateProductSlot,
    getChangeInventory,
    updateChangeInventory
};
export default maintainanceControllers;