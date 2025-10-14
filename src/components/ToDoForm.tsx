import React from 'react';
import { ToDoFormProps, PRIORITIES, PRIORITY} from './../typesAndInterfaces';

export default function ToDoForm({handleSubmit, setDueDate, setPriority, setTask, dueDate, priority, task}: ToDoFormProps){
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />
                <input
                    type="date"
                    placeholder="Due Date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate ?? ''}
                />
                <select
                    onChange={(e) => setPriority(e.target.value as PRIORITY)}
                    value={priority}
                >
                    {PRIORITIES.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                    ))}
                </select>
                <button type="submit">Add Task</button>
            </form>
        </>
    )
}