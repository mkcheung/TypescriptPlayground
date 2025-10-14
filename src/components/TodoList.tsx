import React from 'react';
import { ToDo } from 'src/typesAndInterfaces';
import { ToDoListProps } from 'src/typesAndInterfaces';

export default function ToDoList({visibleToDos, toggleTask, removeTask}:ToDoListProps) {
    return (
        <>
            {visibleToDos.map(toDo => (
                <li
                    id={toDo.id}
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
                        background: "#fff"
                    }}
                >
                    <input
                        type="checkbox"
                        onChange={() => toggleTask(toDo.id)}
                        onClick={(e:React.MouseEvent<HTMLInputElement>) => {e.stopPropagation()}}
                    />
                    <span style={{
                        textDecoration: toDo.done ? "line-through" : "none",
                        color: toDo.done ? "#777" : "#111",
                        wordBreak: "break-word"
                    }}>
                    {toDo.task}
                    </span>
                    <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {e.stopPropagation();removeTask(toDo.id)}}>
                        x
                    </button>
                </li>
            ))}
        </>
    )
}