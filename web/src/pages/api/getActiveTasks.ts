import { NextApiRequest, NextApiResponse } from 'next';
import { getActiveTasks } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const activeTasks = getActiveTasks();
        res.status(200).json(activeTasks);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
