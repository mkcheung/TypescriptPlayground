import React, { 
    useCallback, 
    useEffect,
    useMemo, 
    useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    add,
    AppDispatch,
    clear as clearAC,
    remove as removeAC,
    RootState,
    setFilter,
    toggle as toggleAC
} from './store';
import { FILTER, FILTERS, PRIORITY, ToDo } from './typesAndInterfaces';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import Toolbar from './components/Toolbar';
import { selectVisibleToDos, selectRemaining } from './selectors'
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
    const dispatch = useDispatch<AppDispatch>();
    const toDos = useSelector((s: RootState) => s.toDos);
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<PRIORITY>('medium');
    const [task, setTask] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(toDos))
    }, [toDos]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = task.trim();
        if(!value){
            return;
        }
        dispatch(add({dueDate, priority, task:value}));
        setTask('');
        setDueDate('');
        setPriority('medium');
    }

    const toggleTask = useCallback((id:string) => {
        dispatch(toggleAC({id}));
    }, [])

    const removeTask = useCallback((id:string) => {
        dispatch(removeAC({id}));
    }, [])                                                                                       

    const clearToDos = () => {
        dispatch(clearAC());
        localStorage.removeItem('todos');
    }

    const visibleToDos = useSelector(selectVisibleToDos);
    const remaining = useSelector(selectRemaining)
    const onFilter = (f: FILTER) => dispatch(setFilter(f))

    return (
        <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Todo List</h1>
            <div>
                <ToDoForm task={task} handleSubmit={handleSubmit} priority={priority} dueDate={dueDate} setDueDate={setDueDate} setTask={setTask} setPriority={setPriority}/>
            </div>

            <div>
                <Toolbar setFilter={onFilter} clearToDos={clearToDos} remaining={remaining} />
            </div>

            <ul>
                <ToDoList visibleToDos={visibleToDos} toggleTask={toggleTask} removeTask={removeTask} />
            </ul>
        </div>
    )
}