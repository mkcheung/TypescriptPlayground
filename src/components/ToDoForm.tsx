import React from 'react';
import { 
    useDispatch,
    useSelector
} from 'react-redux';
import { 
    PRIORITIES,
    PRIORITY
} from './../typesAndInterfaces';
import { 
    selectDueDate,
    selectForm,
    selectPriority,
    selectTask,
} from './../selectors'
import { 
    add,
    AppDispatch,
    setDueDate,
    setPriority,
    setTask,
} from './../store';

export default function ToDoForm(){
    
    const dispatch = useDispatch<AppDispatch>();
    const { dueDate, priority, task } = useSelector(selectForm)
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = task.trim();
        if(!value){
            return;
        }
        dispatch(add({dueDate, priority, task:value}));
        dispatch(setTask({task:value}));
        dispatch(setDueDate({dueDate:''}));
        dispatch(setPriority({priority:'medium'}));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    onChange={(e) => dispatch(setTask({task:e.target.value}))}
                    value={task}
                />
                <input
                    type="date"
                    placeholder="Due Date"
                    onChange={(e) => dispatch(setDueDate({dueDate:e.target.value}))}
                    value={dueDate ?? ''}
                />
                <select
                    onChange={(e) => dispatch(setPriority({priority:e.target.value as PRIORITY}))}
                    value={priority}
                >
                    {PRIORITIES.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                    ))}
                </select>
                <button type="submit">Add Task</button>
            </form>
        </>
    )
}