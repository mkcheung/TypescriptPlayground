import React from 'react';
import { ToDoListProps } from 'src/typesAndInterfaces';

export default function ToDoList({ visibleToDos, toggleTask, removeTask }: ToDoListProps) {
    return (
        <>
            {visibleToDos.map(toDo => (
                <li
                    key={toDo.id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 10,
                        background: "#fafafa",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                >
                    <div style={{ display: "flex", gap: 10, flex: 1 }}>
                        <input
                            type="checkbox"
                            onChange={() => toggleTask(toDo.id)}
                            onClick={(e: React.MouseEvent<HTMLInputElement>) => { e.stopPropagation() }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{
                                textDecoration: toDo.done ? "line-through" : "none",
                                color: toDo.done ? "#777" : "#111",
                                wordBreak: "break-word"
                            }}>
                                {toDo.task}
                            </div>
                            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                                Created: {toDo.createdAt || "—"}
                            </div>
                            {toDo.dueDate && (
                                <div style={{ fontSize: 12, color: "#b33" }}>
                                    Due: {toDo.dueDate}
                                </div>
                            )}

                            {/* Right side: priority + delete */}
                            <div style={{ textAlign: "right" }}>
                                {toDo.priority && (
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color:
                                                toDo.priority === "high"
                                                    ? "red"
                                                    : toDo.priority === "medium"
                                                        ? "orange"
                                                        : "green",
                                        }}
                                    >
                                        {toDo.priority.toUpperCase()}
                                    </div>
                                )}
                                <button
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        removeTask(toDo.id);
                                    }}
                                    style={{
                                        marginTop: 6,
                                        background: "transparent",
                                        border: "none",
                                        color: "#c00",
                                        fontSize: 14,
                                        cursor: "pointer",
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </>
    )
}