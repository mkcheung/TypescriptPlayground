import React, { 
    useCallback, 
    useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectDueDate,
    selectPriority,
    selectRemaining,
    selectTask,
    selectVisibleToDos 
} from './selectors'
import { 
    add,
    AppDispatch,
    appStarted,
    clear as clearAC,
    remove as removeAC,
    RootState,
    toggle as toggleAC
} from './store';
import { ToDo } from './typesAndInterfaces';
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
    const dispatch = useDispatch<AppDispatch>();
    const remaining = useSelector(selectRemaining)
    const toDos = useSelector((s: RootState) => s.toDos);
    const visibleToDos = useSelector(selectVisibleToDos);

    useEffect(() => {
        dispatch(appStarted());
    }, [dispatch]);

    const toggleTask = useCallback((id:string) => {
        dispatch(toggleAC({id}));
    }, [])

    const removeTask = useCallback((id:string) => {
        dispatch(removeAC({id}));
    }, [])                                                                                       

    const clearToDos = () => {
        dispatch(clearAC());
    }

    return (
        <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Todo List</h1>
            <div>
                <ToDoForm />
            </div>

            <div>
                <Toolbar clearToDos={clearToDos} remaining={remaining} />
            </div>

            <ul>
                <ToDoList visibleToDos={visibleToDos} toggleTask={toggleTask} removeTask={removeTask} />
            </ul>
        </div>
    )
}