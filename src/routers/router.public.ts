import express from "express";
import middlewares from "../middlewares";
import productControllers from "../controllers/controllers.public";

const publicRouter: express.Router = express.Router();

// Getting Products -------------------------------------------------------------------------------- 
publicRouter.get("/products", productControllers.getAllProductSlots); // Get all available Products in the vending machine
publicRouter.get("/products/:id", productControllers.getProductSlot); // Get a specific product using id as parameter

// Handling Purchases -------------------------------------------------------------------------------------
// Handles purchase of a product. Required info product id, quantity and money
publicRouter.post("/purchase", productControllers.handlePurchase);


//Testing -------------------------------------------------------------------------------------------------
// A GET alternative method for purchase.Same required info passed as a query, make it easier for browser testing
publicRouter.get("/purchase", middlewares.handlePurchaseQuery, productControllers.handlePurchase);

export default publicRouter;