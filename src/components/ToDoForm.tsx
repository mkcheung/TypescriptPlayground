import React from 'react';

interface AddTodoFormProps {
    task: string;
    handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void,
    setTask: (value: string) => void
}

export default function AddTodoForm ({task, handleSubmit, setTask}: AddTodoFormProps) {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={task}
                placeholder="New Task"
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    )
}