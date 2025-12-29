import React, {
    useCallback, 
    useState,
    useMemo, 
    useEffect,
    
} from 'react';
import './App.css'

export default function App(){

    const [toDos, setToDos] = useState([]);
    const [task, setTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(()=>{
        const toDosFromLocalStorage = localStorage.getItem('toDos');
        if(toDosFromLocalStorage){
            setToDos(JSON.parse(toDosFromLocalStorage));
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos])
    
    const FILTERS = ['all', 'active', 'completed'];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('value prior to trim ' + task);
        const value = task.trim();
        console.log(value);
        if(!value){
            return;
        }
        console.log('submitted');
        setToDos(prev => [...prev, {id:Date.now().toString(), task:value, done:false}]);
        setTask('');
    }

    const toggleTask = useCallback((id) => {
        setToDos(prev => prev.map((toDo) => (
            toDo.id === id ? { ...toDo, done:!toDo.done } : toDo
        )));
    }, [])

    const visibleToDos = useMemo(() => {
        if(filter === 'active'){
            return toDos.filter((toDo) => !toDo.done)
        }
        if(filter === 'completed'){
            return toDos.filter((toDo) => toDo.done)
        }
        return toDos;
    }, [toDos, filter])


    const removeTask = (id) => {
        setToDos(prev => prev.filter(toDo => toDo.id != id))
    }

    const remaining = useMemo(() => {
        const activeTasks = toDos.filter((toDo) => 
           !toDo.done
        );
        return activeTasks.length;
    }, [toDos])

    const clearToDos = useCallback(() => {
        setToDos([]);
        setTask('');
        localStorage.removeItem('toDos');
    }, [])

    return (
        
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
        <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />
                <button type="submit">Add Task</button>
            </form>
        <div>
            {FILTERS.map(filterOption => (
                <button key={filterOption} onClick={() => setFilter(filterOption)}>{filterOption[0].toUpperCase()+filterOption.slice(1)}</button>
            ))}
        </div>
        <button onClick={() => clearToDos()}>Clear</button>
        <div>
            {remaining} Remaining
        </div>

        <ul style={{ marginTop:16, paddingLeft:0, listStyle:"none"}}>
            {
                visibleToDos.map((toDo) => (
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
                            background: "#fff"
                        }}
                    >
                        <input
                            type="checkbox"
                            onChange={(e)=>{e.stopPropagation();toggleTask(toDo.id);}}
                            checked={toDo.done}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span style={{
                            textDecoration: toDo.done ? "line-through" : "none",
                            color: toDo.done ? "#777" : "#111",
                            wordBreak: "break-word"
                        }}>
                            {toDo.task}
                        </span>
                        <button onClick={(e) => {e.stopPropagation(); removeTask(toDo.id);}}>
                            x
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
    )
}