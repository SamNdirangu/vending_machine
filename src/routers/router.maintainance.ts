import express from "express";
import middlewares from "../middlewares";
import maintainanceControllers from "../controllers/controllers.maintainance";

const maintainanceRouter: express.Router = express.Router();

// Product maintainance ------------------------------------------------
maintainanceRouter.put("/product/create", maintainanceControllers.createProductSlot); // Create a new product
maintainanceRouter.patch("/product/update/:id", maintainanceControllers.updateProductSlot); //Update a product price / quantity

//Change Inventory Maintainance -------------------------------------------
maintainanceRouter.get("/change", maintainanceControllers.getChangeInventory); //Get the current change inventory
maintainanceRouter.patch("/change", maintainanceControllers.updateChangeInventory); // Modifiy the change inventory for any type  of coin or note



//Get Methods for easy testing with browser ******************************************************************
// Params are sent as query params
maintainanceRouter.get("/product/create", middlewares.handleMaintainanceQuery, maintainanceControllers.createProductSlot);
maintainanceRouter.get("/product/update/:id", middlewares.handleMaintainanceQuery, maintainanceControllers.updateProductSlot);
maintainanceRouter.get("/change/update", middlewares.handleMaintainanceQuery, maintainanceControllers.updateChangeInventory);

export default maintainanceRouter;