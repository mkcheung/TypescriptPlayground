import React from 'react';
import { ToDo } from './../types'

interface TodoListProps {
    visibleToDos: readonly ToDo[];
    toggleToDo: (id:string) => void;
    removeToDo: (id:string) => void;
}

export default function TodoList ({visibleToDos, toggleToDo, removeToDo}: TodoListProps) {
    return (
        <>
            {visibleToDos.map(toDo => (
                <li
                    key={toDo.id}
                    onClick={() => toggleToDo(toDo.id)}
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
                        type='checkbox'
                        checked={toDo.done}
                        onChange={() => toggleToDo(toDo.id) }
                        onClick={(e:React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                    />
                    <span>
                        {toDo.task}
                    </span>
                    <button type="button" onClick={(e:React.MouseEvent<HTMLButtonElement>) => {e.stopPropagation(); removeToDo(toDo.id);}}>
                        x
                    </button>
                </li>
            ))}
        </>
    )
}