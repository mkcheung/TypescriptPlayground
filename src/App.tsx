import React, { 
    useCallback, 
    useMemo, 
    useState,  
} from 'react';
import './App.css'

interface ToDo {
    id:string
    task:string
    done:boolean
}

type Filter = 'all' | 'active' | 'completed'

export default function App () {
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [task, setTask] = useState<string>('');
    const [filter, setFilter] = useState<Filter>('all');

    const FILTERS = ['all', 'active', 'completed'] as const satisfies readonly Filter[];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = task.trim();
        if(!value){
            return;
        }
        setToDos(prev => [...prev, {id:Date.now().toString(), task:value, done:false}]);
        setTask('');
    }

    const toggleToDo = useCallback((id:string) => {
        setToDos(prev => prev.map(toDo => toDo.id === id ? { ...toDo, done:!toDo.done} : toDo));
    }, [])

    const removeToDo = useCallback((id:string) => {
        setToDos(prev => prev.filter(toDo => toDo.id !== id))
    }, [])

    const visibleToDos = useMemo<ToDo[]>(() => {
        if(filter === 'active'){
            return toDos.filter(toDo => !toDo.done);
        }
        if(filter === 'completed'){
            return toDos.filter(toDo => toDo.done);
        }
        return toDos;
    }, [filter, toDos])

    const remaining = useMemo<number>(() => {
        const numRemain = toDos.filter(toDo => !toDo.done);
        return numRemain.length;
    }, [toDos])

    return (
        <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Todo List</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={task}
                        placeholder="New Task"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <div>
                {
                    FILTERS.map(item => (
                        <button key={item} onClick={() => setFilter(item)}>{item[0].toUpperCase()+item.slice(1)}</button>
                    ))
                }
                <div>
                    {remaining} remaining
                </div>
            </div>

            <ul>
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
            </ul>
        </div>
    )
}