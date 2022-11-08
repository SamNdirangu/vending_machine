import express from 'express';
import { StatusCodes } from "http-status-codes";
import errorResponses from '../errors/erros.custom';
import changeInventory, { ChangeSchema } from "../models/model.change";

//Change Controllers ----------------------------------------------------------------
/**Get the current change inventory*/
const getChangeInventory = async (req: express.Request, res: express.Response) => {
    const changeStatus: ChangeSchema = changeInventory.getChange();

    res.status(StatusCodes.OK).json({ success: true, changeStatus });
};

/**Set the change inventory */
const setChangeInventory = async (req: express.Request, res: express.Response) => {
    const { changeJSON } = req.body;
    if (changeJSON == undefined) {
        throw new errorResponses.BadRequest(`Missing required fields: changeJSON`);
    }
    const change = JSON.parse(changeJSON);

    const changeStatus = changeInventory.setChange(change);
    if (!changeStatus) {
        throw new errorResponses.BadRequest(`The change inventory does not conform to change schema`);
    }
    res.status(StatusCodes.CREATED)
        .json({ success: true, changeStatus });
};

/**Update change inventory */
const updateChangeInventory = async (req: express.Request, res: express.Response) => {
    const { deduct, changeJSON } = req.body;
    if (deduct == undefined || !changeJSON) {
        throw new errorResponses.BadRequest(`Missing required fields: addChange,changeJSON`);
    }
    const isDeduct: boolean = JSON.parse(deduct);
    const change = JSON.parse(changeJSON); //parse our changejson

    const changeStatus: ChangeSchema = changeInventory.updateChange(change, isDeduct);
    if (!changeStatus) {
        throw new errorResponses.BadRequest(`Missing required fields: addChange,changeJSON`);
    }

    res.status(StatusCodes.OK).json({ success: true, changeStatus });
};

const maintainanceControllers = {
    getChangeInventory,
    setChangeInventory,
    updateChangeInventory
};
export default maintainanceControllers;