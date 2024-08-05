import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  completed: boolean;
  active: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskTitle: string) => {
    try {
      await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskTitle }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to complete task', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Task Board</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px',
                width: '300px',
              }}
            >
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Group: {task.group}</p>
              <p>Persona: {task.persona}</p>
              <button
                style={{
                  backgroundColor: task.completed ? '#ddd' : '#0070f3',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                disabled={task.completed}
                onClick={() => completeTask(task.title)}
              >
                {task.completed ? 'Completed' : 'Complete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
