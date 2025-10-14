import React, {
    useCallback, 
    useEffect,
    useState,
    useMemo, 
    
} from 'react';
import './App.css'

import ToDoForm from './componentsPractice/ToDoForm';
import Toolbar from './componentsPractice/Toolbar';
import { ToDo, FILTER, FILTERS } from './typesAndInterfacesPractice';
import ToDoList from './componentsPractice/TodoList';

export default function App(){

    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [task, setTask] = useState<string>('');
    const [filter, setFilter] = useState<FILTER>('all');

    useEffect(()=>{
        const toDosFromLocalStorage = localStorage.getItem('toDos');
        if(toDosFromLocalStorage){
            setToDos(JSON.parse(toDosFromLocalStorage));
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos])
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = task.trim();
        if(!value){
            return;
        }
        setToDos(prev => [...prev, {id:Date.now().toString(), task:value, done:false}]);
        setTask('');
    }

    const toggleTask = useCallback((id:string) => {
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


    const removeTask = (id:string) => {
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
            <div>
                <ToDoForm handleSubmit={handleSubmit} setTask={setTask} task={task}/>
                <Toolbar clearToDos={clearToDos} remaining={remaining} setFilter={setFilter}/>
            </div>
            <ToDoList visibleToDos={visibleToDos} toggleTask={toggleTask} removeTask={removeTask} />
        </div>
    )
}