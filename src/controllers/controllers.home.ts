import express from 'express';
import { StatusCodes } from 'http-status-codes';
const homepage = async (req: express.Request, res: express.Response) => {

    res.status(StatusCodes.OK).send(`
        <div>
            <h1>Welcome to the Vending Machine</h1>
            <p> To use please read the  
                <a href="https://github.com/SamNdirangu/vending_machine/blob/main/README.md" target="_blank">readme documentation</a> 
                or use the postman collections to quickly send requests
            <br>
            <p>Quick Links</p>
            <p> 
                <a href="/api/products/" target="_blank">
                    Get All Products
                </a>
            </p>
            <p> 
                <a href="/api/products/purchase/get?id=6368c982eef7cf49cfb99d75&quantity=1&amount=1320" target="_blank">
                    Purchase Random Product Oreos
                </a>
            </p>
            <p> 
                <a href="/api/maintainance/change" target="_blank">
                    View current change in Machine
                </a>
            </p>
            
            <p> Accepted denominations:: 1000,500,200,100,50,40,20,10,5,1</p>

        </div>
    `);
};

export default homepage;