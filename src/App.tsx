import React, { 
    useCallback, 
    useEffect,
    useMemo, 
    useState,  
    useReducer
} from 'react';
import { toDosReducer } from './reducers/toDosReducer';
import { ToDo, FILTER } from './typesAndInterfaces';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import Toolbar from './components/Toolbar';
import './App.css'

function init(): ToDo[] {
    try {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return []; 
    }
}

export default function App () {
    const [task, setTask] = useState<string>('');
    const [filter, setFilter] = useState<FILTER>('all');
    const [toDos, dispatch] = useReducer(toDosReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(toDos))
    }, [toDos]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = task.trim();
        if(!value){
            return;
        }
        dispatch({type: 'add', task:value});
        setTask('');
    }

    const toggleTask = useCallback((id:string) => {
        dispatch({type: 'toggle', id:id});
    }, [])

    const removeTask = useCallback((id:string) => {
        dispatch({type: 'remove', id:id});
    }, [])

    const clearToDos = () => {
        dispatch({type: 'clear'});
        localStorage.removeItem('todos');
    }

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
                <ToDoForm task={task} handleSubmit={handleSubmit} setTask={setTask}/>
            </div>

            <div>
                <Toolbar setFilter={setFilter} clearToDos={clearToDos} remaining={remaining} />
            </div>

            <ul>
                <ToDoList visibleToDos={visibleToDos} toggleTask={toggleTask} removeTask={removeTask} />
            </ul>
        </div>
    )
}