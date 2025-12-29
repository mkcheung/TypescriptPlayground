import React from "react";

interface ToDoFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    setTask: (value: string) => void
    task: string
}

export default function ToDoForm({ handleSubmit, setTask, task }: ToDoFormProps) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />
                <button type="submit">Add Task</button>
            </form>
        </>
    );
}