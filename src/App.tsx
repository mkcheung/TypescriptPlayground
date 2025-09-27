import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// types are rules that determine 
type ToDoProps = {
    id: string
    text: string
    done: boolean
}

export default function App(){
    const [toDos, setToDos] = useState<ToDoProps[]>([]);
    const [text, setText] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = text.trim();
        if(!value){
            return;
        }

        setToDos(prev => [...prev, {id:Date.now(), text:value, done:false }] );
        setText('');
    }

    const toggleToDo = (id) => {
        setToDos(prev => prev.map(t => ( t.id === id ? { ...t, done:!t.done } : t)))
    }

    return (
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                placeholder="New Task"
                onChange={(e)=> setText(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
        <ul style={{ marginTop:16, paddingLeft:0, listStyle:"none"}}>
        {toDos.map(todo => (
            <li
                id={todo.id}
                onClick={() => toggleToDo(todo.id)}
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
                    checked={todo.done}
                    onChange={() => toggleToDo(todo.id)}
                    onClick={e => e.stopPropagation()}
                />
                <span>
                    {todo.text}
                </span>
            </li>
        ))}
        </ul>
    </div>

    )

}