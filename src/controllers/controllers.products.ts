import express from 'express';
import { StatusCodes } from "http-status-codes";
import changeInventory from '../models/model.change';
import productsInventory, { ProductSchema } from '../models/model.products';
import errorResponses from '../errors/erros.custom';

/** Get All productsInventory */ //--------------------------------------------------------
const getAllProducts = async (req: express.Request, res: express.Response) => {
    const products = productsInventory.findAll()
    res.status(StatusCodes.OK).json({ success: true, products });
}

/** Get a single product by its id */ //--------------------------------------------------------
const getProduct = async (req: express.Request, res: express.Response) => {
    const id = req.params.id; //Get id from url params
    const product = productsInventory.findByID(id)
    if (!product) {
        throw new errorResponses.NotFound(`No product found with such id: ${id}`);
    }
    res.status(StatusCodes.OK).json({ success: true, product });
}

//----------------------------------------------------------------------------------------------
/**POST:: Handles purchase of a specific product 
 * Requires product ID, Quantity and Amount in denomination
 */
const handlePurchase = async (req: express.Request, res: express.Response) => {
    const { id, quantity, amount } = req.body
    if (!id || !quantity || !amount) { //Check if all required info is available
        throw new errorResponses.BadRequest(`Please provide all required info`)
    }

    if (isNaN(quantity) || isNaN(amount)) {
        throw new errorResponses.BadRequest(`Please provide required info in correct format`)
    }

    const product = productsInventory.findByID(id) //Get product info by id
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
    const totalCost: number = quantity * Number(product.price)
    if (totalCost > amount) {
        throw errorResponses
            .createCustom(`Provided amount of ${amount} is not enough. Required amount is ${totalCost}`,
                StatusCodes.ACCEPTED);
    }

    // Check if sufficient change is within the machine
    const changeAmount = amount - totalCost;
    //If no change
    if (changeAmount == 0) {
        //Return success and zero change amount
        res.status(StatusCodes.OK).json({ success: true, changeAmount })
    }
    //Find if we have enough change
    const changeInDenom = changeInventory.findChange(changeAmount)
    if (!changeInDenom) {
        throw errorResponses
            .createCustom(`The machine doesn't have enough change for the amount to complete the purchase`,
                StatusCodes.ACCEPTED);
    }

    //Update change and product inventory
    changeInventory.updateChange(changeInDenom, true)
    productsInventory.updateQuantity(id, quantity, true)

    //Return success and change amount
    res.status(StatusCodes.OK).json({
        success: true,
        product: product.name,
        quantity: quantity,
        amountGiven: amount,
        totalChange: changeAmount,
        changeInDenom
    })
}


const createProduct = (req: express.Request, res: express.Response) => {
    const { name, quantity, price } = req.body
    //Check if all required info is available
    if (!name || !quantity || !price) {
        throw new errorResponses.BadRequest(`Please provide all required info: name,quantity,price`)
    }
    //Ensure correct type
    if (isNaN(quantity) || isNaN(price)) {
        throw new errorResponses.BadRequest(`Please provide required info in correct format`)
    }

    const product = productsInventory.create(name, quantity, price);
    if (!product) {
        throw new errorResponses.BadRequest(`Please provide required info in correct format`)
    }

    res.status(StatusCodes.CREATED).json({ success: true, product })
}

const addProductQuantity = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id
    const quantity: number = req.body.quantity
    //Check if all required info is available
    if (!id || !quantity) {
        throw new errorResponses.BadRequest(`Please provide all required info`)
    }
    //Ensure correct type
    if (isNaN(quantity)) {
        throw new errorResponses.BadRequest(`Please provide required info in correct format`)
    }

    const product = productsInventory.updateQuantity(id, quantity, false)
    res.status(StatusCodes.CREATED).json({ success: true, product })
}


const productControllers = {
    getProduct,
    createProduct,
    getAllProducts,
    handlePurchase,
    addProductQuantity
};

export default productControllers;