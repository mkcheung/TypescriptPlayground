import React from 'react';

import { ToDoFormProps } from '../typesAndInterfacesPractice';

export default function ToDoForm({handleSubmit, setTask, task}:ToDoFormProps) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
                    value={task}
                />
                <button type="submit">Add Task</button>
            </form>
        </>
    )
}