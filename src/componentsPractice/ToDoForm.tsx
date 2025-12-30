import React from "react";

export default function ToDoForm({ handleSubmit, setTask, task }) {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}