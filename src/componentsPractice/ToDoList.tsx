import React from "react";

export default function ToDoList({ visibleToDos, toggleTask, removeTask }) {
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
                        checked={toDo.done}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            e.stopPropagation();
                            toggleTask(toDo.id);
                        }}
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