import React, { useState } from 'react'
import './App.css'

export default function App (){
    const [toDos, setToDos] = useState([]);
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = task.trim();
        if(!value){
            return;
        }

        setToDos(prev => [...prev, {id:Date.now().toString(), task:value, done:false}]);
        setTask('');
    }

    const toggleToDo = (id) => {
        setToDos(prev => prev.map(t => ( t.id === id ? {...t, done:!t.done} : t) ))
    }
    
    const removeToDo = (id) => {
        setToDos(prev => prev.filter(t => t.id !== id))
    }

    return (
        <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value) }
                    placeholder="New Task"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul style={{ marginTop:16, paddingLeft:0, listStyle:"none"}}>
                {toDos.map(toDo => (
                    <li
                        id={toDo.id}
                        onClick={()=>toggleToDo(toDo.id)}
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
                            checked={toDo.done}
                            onChange={() => toggleToDo(toDo.id)}
                            onClick={(e)=> e.stopPropagation()}
                        />
                        <span>
                            {toDo.task}
                        </span>
                        <button
                            onClick={(e)=> { e.stopPropogation(); removeToDo(toDo.id);}}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}