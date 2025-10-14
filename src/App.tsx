import React, { 
    useCallback, 
    useEffect,
    useMemo, 
    useState,  
    useReducer
} from 'react';
import { toDosReducer } from './reducers/toDosReducer';
import { FILTER, PRIORITY, ToDo } from './typesAndInterfaces';
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
    const [dueDate, setDueDate] = useState<string>('');
    const [filter, setFilter] = useState<FILTER>('all');
    const [priority, setPriority] = useState<PRIORITY>('medium');
    const [task, setTask] = useState<string>('');
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
        const createdAt = new Date().toISOString().slice(0,10);
        dispatch({type: 'add', dueDate:dueDate, priority:priority, createdAt:createdAt, task:value});
        setTask('');
        setDueDate('');
        setPriority('medium');
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

    const baseFiltered = useMemo<ToDo[]>(() => {
        const todaysDate = new Date().toISOString().slice(0,10);
        if(filter === 'active'){
            return toDos.filter(toDo => !toDo.done);
        }
        if(filter === 'completed'){
            return toDos.filter(toDo => toDo.done);
        }
        if(filter === 'today'){
            return toDos.filter(todo => (todo.dueDate === todaysDate))
        }
        if(filter === 'overdue'){
            return toDos.filter(todo => ( !todo.done && todo.dueDate && todo.dueDate > todaysDate))
        }
        return toDos;
    }, [filter, toDos]);

    const visibleToDos = useMemo<ToDo[]>(() => {
        const prioRank: Record<PRIORITY, number> = { high: 0, medium: 1, low: 2 };
        return [...baseFiltered].sort((a, b) => {
            const ap = prioRank[a.priority], bp = prioRank[b.priority];
            if (ap !== bp) return ap - bp;
            if (a.dueDate && b.dueDate && a.dueDate !== b.dueDate) return a.dueDate < b.dueDate ? -1 : 1;
            if (a.dueDate && !b.dueDate) return -1;
            if (!a.dueDate && b.dueDate) return 1;
            return (b.createdAt || '').localeCompare(a.createdAt || '');
        });
    }, [baseFiltered]);


    const remaining = useMemo<number>(() => {
        const numRemain = toDos.filter(toDo => !toDo.done);
        return numRemain.length;
    }, [toDos])

    return (
        <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Todo List</h1>
            <div>
                <ToDoForm task={task} handleSubmit={handleSubmit} priority={priority} dueDate={dueDate} setDueDate={setDueDate} setTask={setTask} setPriority={setPriority}/>
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