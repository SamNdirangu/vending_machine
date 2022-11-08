import express from 'express';
import { StatusCodes } from "http-status-codes";
import changeInventory from '../models/model.change';
import productsInventory from '../models/model.products';
import errorResponses from '../errors/erros.custom';

//----------------------------------------------------------------------------------------------
/**POST:: Handles purchase of a specific product 
 * Requires product ID, Quantity and Amount in denomination
 */
const handlePurchase = async (req: express.Request, res: express.Response) => {
    const { id, quantity, amountJSON } = req.body;
    if (!id || !quantity || !amountJSON) { //Check if all required info is available
        throw new errorResponses.BadRequest(`Please provide all required info`);
    }
    if (isNaN(quantity)) {
        throw new errorResponses.BadRequest(`Please provide quantiry as number format`);
    }

    const amountDenoms = JSON.parse(amountJSON);
    if (amountDenoms instanceof Object == false) {
        throw new errorResponses.BadRequest(`Please provide amount in the correct JSON format`);
    }
    /**The total amount inputed by the user*/
    const totalAmount = changeInventory.computeAmount(amountDenoms);

    /**The product slot object of the specified by the user */
    const product = productsInventory.findByID(id);
    if (!product) { // Check if product exists
        throw new errorResponses.NotFound(`No product found with such id: ${id}`);
    }

    //Check if required quantity is available
    if (product.quantity < quantity) {
        throw errorResponses
            .createCustom(`${product.name} left are not enough to complete order, Pick maximum of ${product.quantity}`,
                StatusCodes.ACCEPTED);
    }

    //Check if amount given is enough
    const totalCost: number = quantity * Number(product.price);
    if (totalCost > totalAmount) {
        throw errorResponses
            .createCustom(`Provided amount of ${totalAmount} is not enough. Required amount is ${totalCost}`,
                StatusCodes.ACCEPTED);
    }

    // Check if sufficient change is within the machine
    const changeAmount = totalAmount - totalCost;
    //If no change
    if (changeAmount == 0) {
        //Return success and zero change amount
        res.status(StatusCodes.OK).json({ success: true, changeAmount });
    }
    //Find if we have enough change
    const changeInDenom = changeInventory.findChange(changeAmount);
    if (!changeInDenom) {
        throw errorResponses
            .createCustom(`The machine doesn't have enough change for the amount to complete the purchase`,
                StatusCodes.ACCEPTED);
    }

    //Deduct change and add change input by user
    changeInventory.updateChange({ changeDenominations: changeInDenom, isUpdate: true, deduct: true });
    changeInventory.updateChange({ changeDenominations: amountDenoms, isUpdate: true, deduct: false });

    //Deduct Products from the product inventory
    productsInventory.updateSlotQuantity({ id, quantity, deduct: true });

    //Return success and change amount
    res.status(StatusCodes.OK).json({
        success: true,
        product: product.name,
        quantity: quantity,
        totalCost,
        amountGiven: totalAmount,
        totalChange: changeAmount,
        changeInDenom
    });
};


/** Get All productsInventory */ //--------------------------------------------------------
const getAllProductSlots = async (req: express.Request, res: express.Response) => {
    const products = productsInventory.findAll();
    res.status(StatusCodes.OK).json({ success: true, products });
};

/** Get a single product by its id */ //--------------------------------------------------------
const getProductSlot = async (req: express.Request, res: express.Response) => {
    const id = req.params.id; //Get id from url params
    const product = productsInventory.findByID(id);
    if (!product) {
        throw new errorResponses.NotFound(`No product found with such id: ${id}`);
    }
    res.status(StatusCodes.OK).json({ success: true, product });
};


const publicControllers = {
    handlePurchase,
    getProductSlot,
    getAllProductSlots
};

export default publicControllers;