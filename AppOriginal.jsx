import { useState } from 'react'
import './App.css'

export default function App(){
    const [toDos, setToDos] = useState([]);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = text.trim();
        if(!value){
            return;
        }
        setToDos(prev => [...prev, {id:Date.now(), text:value, done:false}]);
        setText('')
    }

    const toggleToDo = (id) => {
        setToDos(prev => prev.map( t => (t.id === id ? {...t, done:!t.done} : t) ));
    }

    return (
        <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Todo List</h1>
            <form onSumbit={handleSubmit}>
                <input
                    type="text"
                    placeholder="taskname"
                    value={text}
                    onClick={(e)=> setText(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {toDos.map( todo => (
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
                            onChange={()=>toggleToDo(todo.id)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span style={{
                            textDecoration: todo.done ? "line-through" : "none",
                            color: todo.done ? "#777" : "#111",
                            wordBreak: "break-word"
                        }}>
                            {todo.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}