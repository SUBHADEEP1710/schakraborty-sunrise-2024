import { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, description, persona, group } = req.body;
        createTask(title, description, persona, group);
        res.status(200).json({ message: 'Task created' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
