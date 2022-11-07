import express from "express";
import productsRouter from "./router.products";
import maintainanceRouter from "./router.maintainance";


const apiRouter = express.Router();

apiRouter.use("/products", productsRouter)
apiRouter.use("/maintainance", maintainanceRouter)


export default apiRouter