import React, { 
    useCallback, 
    useEffect,
    useMemo, 
    useState,  
} from 'react';
import { ToDo, Filter } from './types'
import ToDoForm from './components/ToDoForm';
import TodoList from './components/TodoList';
import Toolbar from './components/Toolbar';

import './App.css'


export default function App () {
    const [toDos, setToDos] = useState<ToDo[]>(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [task, setTask] = useState<string>('');
    const [filter, setFilter] = useState<Filter>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(toDos))
    }, [toDos]);

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

    const clearToDos = () => {
        setToDos([]);
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
                <TodoList visibleToDos={visibleToDos} toggleToDo={toggleToDo} removeToDo={removeToDo} />
            </ul>
        </div>
    )
}