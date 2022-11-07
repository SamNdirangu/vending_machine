import express from "express";
import productControllers from "../controllers/controllers.products";
import maintainanceControllers from "../controllers/controllers.maintainance";

const maintainanceRouter: express.Router = express.Router();

// Product maintainance ------------------------------------------------
maintainanceRouter.put("/product", productControllers.createProduct) // Create a new product
maintainanceRouter.patch("/product/:id", productControllers.addProductQuantity) //Update a product price

//Change Inventory Maintainance -------------------------------------------
maintainanceRouter.get("/change", maintainanceControllers.getChangeInventory) //Get the current change inventory
maintainanceRouter.put("/change", maintainanceControllers.setChangeInventory) //set a new whole change inventory
maintainanceRouter.patch("/change", maintainanceControllers.updateChangeInventory) // Add/Remove quantity of certain denoms

export default maintainanceRouter