import React from "react";

interface ToDoProps {
    id: string
    task: string
    done: boolean
}

interface ToDoListProps {
    visibleToDos: ToDoProps[]
    toggleTask: (value: string) => void
    removeTask: (value: string) => void
}

export default function ToDoList({ visibleToDos, toggleTask, removeTask }: ToDoListProps) {
    return (
        <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: "none" }}>
            {visibleToDos.map((toDo) => (
                <li
                    key={toDo.id}
                    onClick={() => toggleTask(toDo.id)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 10px",
                        border: "1px solid #eee",
                        borderRadius: 6,
                        marginBottom: 8,
                        cursor: "pointer",
                        background: "#fff",
                    }}
                >
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            e.stopPropagation();
                            toggleTask(toDo.id);
                        }}
                        checked={toDo.done}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span
                        style={{
                            textDecoration: toDo.done ? "line-through" : "none",
                            color: toDo.done ? "#777" : "#111",
                            wordBreak: "break-word",
                        }}
                    >
                        {toDo.task}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTask(toDo.id);
                        }}
                    >
                        x
                    </button>
                </li>
            ))}
        </ul>
    );
}