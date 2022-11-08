import express from "express";
import productControllers from "../controllers/controllers.products";
import maintainanceControllers from "../controllers/controllers.maintainance";
import middlewares from "../middlewares";

const maintainanceRouter: express.Router = express.Router();

// Product maintainance ------------------------------------------------
maintainanceRouter.put("/product", productControllers.createProduct); // Create a new product
maintainanceRouter.patch("/product/:id", productControllers.addProductQuantity); //Update a product price

//Change Inventory Maintainance -------------------------------------------
maintainanceRouter.get("/change", maintainanceControllers.getChangeInventory); //Get the current change inventory
maintainanceRouter.put("/change", maintainanceControllers.setChangeInventory); //set a new whole change inventory
maintainanceRouter.patch("/change", maintainanceControllers.updateChangeInventory); // Add/Remove quantity of certain denoms




//Get Methods for easy testing with browser ******************************************************************
// Params are sent as query params
maintainanceRouter.get("/product/create", middlewares.handleMaintainanceQuery, productControllers.createProduct);
maintainanceRouter.get("/product/add/:id", middlewares.handleMaintainanceQuery, productControllers.addProductQuantity);
maintainanceRouter.get("/change/get", middlewares.handleMaintainanceQuery, maintainanceControllers.getChangeInventory);
maintainanceRouter.get("/change/set", middlewares.handleMaintainanceQuery, maintainanceControllers.setChangeInventory);
maintainanceRouter.get("/change/update", middlewares.handleMaintainanceQuery, maintainanceControllers.updateChangeInventory);





export default maintainanceRouter;