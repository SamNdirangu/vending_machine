import { Request, Response } from 'express';
const errorMessage = `
<div>
    <h1>Ooops 404</h1>
    <p> The requested endpoint does not exist</p>
    <br>
    <h4><a href="/">Go Back Home</a></h4>
</div>
`;

/**Default not found error response */
const notFoundResponse = (req: Request, res: Response) =>
    res.status(404).send(errorMessage);

export default notFoundResponse;


