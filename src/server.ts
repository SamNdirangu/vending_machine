import dotenv from 'dotenv';
dotenv.config(); //Grab our envs
import express from 'express';
import 'express-async-errors'; //Automatically handles errors thrown from async functions eliminating need for try and catch
import apiRouter from './routers/api.router';
import errorHandlers from './errors/errors.handlers';
import notFoundResponse from './errors/errors.notFound';


const app = express(); //Set up our app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//API Endpoits Router ---------------------------------
app.use('/api', apiRouter); //Add our API Router endpoint

// Error Handlers -------------------------------------
app.use(notFoundResponse);
app.use(errorHandlers); //Requires express-async-erros

// Start our app ---------------------------------------
const port = 3000 || process.env.PORT; //Set up the app port
const startApp = () => {
    //Starting with in memory simple db
    console.log('Server starting up with simple in memory db.......');
    app.listen(port, () => {
        console.log('Server is listening at http://localhost:' + port);
    });
};

startApp();