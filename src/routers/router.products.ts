import express from "express";
import middlewares from "../middlewares";
import productControllers from "../controllers/controllers.products";

const productsRouter: express.Router = express.Router();

// Getting Products -------------------------------------------------------------------------------- 
productsRouter.get("/", productControllers.getAllProducts); // Get all available Products in the vending machine
productsRouter.get("/:id", productControllers.getProduct); // Get a specific product using id as parameter

// Handling Purchases -------------------------------------------------------------------------------------
productsRouter.post("/purchase",
    productControllers.handlePurchase); // Handles purchase of a product. Required info product id, quantity and money


//Testing -------------------------------------------------------------------------------------------------
// A GET alternative method for purchase.Same required info passed as a query, make it easier for browser testing
productsRouter.get("/purchase/get",
    middlewares.handlePurchaseQuery,
    productControllers.handlePurchase);

export default productsRouter;