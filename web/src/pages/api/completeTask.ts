import { NextApiRequest, NextApiResponse } from 'next';
import { completeTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { taskTitle } = req.body;
        completeTask(taskTitle);
        res.status(200).json({ message: 'Task completed' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
