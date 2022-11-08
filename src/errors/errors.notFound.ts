import { Request, Response } from 'express';

/**Default not found error response */
const notFoundResponse = (req: Request, res: Response) =>
    res.status(404).send('Ooops 404: Requested resource does not exist');

export default notFoundResponse;
