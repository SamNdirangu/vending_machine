import express from "express";
import publicRouter from "./router.public";
import maintainanceRouter from "./router.maintainance";


const apiRouter = express.Router();

apiRouter.use("/public", publicRouter);
apiRouter.use("/maintainance", maintainanceRouter);


export default apiRouter;