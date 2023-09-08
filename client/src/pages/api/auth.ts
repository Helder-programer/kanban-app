// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function verifyToken(req: NextApiRequest, res: NextApiResponse) {    
    const token = req.headers['kanban-token'];

    try {
        await axios.get('http://localhost:8000/users/recoverUserInformations', {
            headers: {
                authorization: token
            }
        });

        res.status(200).json(true);
    }catch(err: any) {
        res.status(401).json(false);
    }
}
