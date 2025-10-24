import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { PRIORITY, ToDo } from './typesAndInterfaces';

export const selectTodos = (s: RootState) => s.toDos;
export const selectFilter = (s: RootState) => s.ui.filter;
export const selectDueDate = (s: RootState) => s.ui.dueDate;
export const selectPriority = (s: RootState) => s.ui.priority;
export const selectTask = (s: RootState) => s.ui.task;
export const selectForm = (s: RootState) => ({ task:s.ui.task, priority:s.ui.priority, dueDate:s.ui.dueDate})

export const selectBaseFiltered = createSelector(
    [selectTodos, selectFilter],
    (toDos, filter): ToDo[] => {
        const todaysDate = new Date().toISOString().slice(0, 10);
        if (filter === 'active') {
            return toDos.filter((toDo) => !toDo.done);
        }
        if (filter === 'completed') {
            return toDos.filter((toDo) => toDo.done);
        }
        if (filter === 'overdue') {
            return toDos.filter((toDo) => (toDo.dueDate && toDo.dueDate < todaysDate));
        }
        if (filter === 'today') {
            return toDos.filter((toDo) => toDo.dueDate === todaysDate)
        }
        return toDos;
    }
);

export const selectVisibleToDos = createSelector(
    [selectBaseFiltered],
    (list): ToDo[] => {
        const prioRank: Record<PRIORITY, number> = { high: 0, medium: 1, low: 2 };
        return [...list].sort((a, b) => {
            const aPriority = prioRank[a.priority];
            const bPriority = prioRank[b.priority];
            if(aPriority !== bPriority){
                return aPriority - bPriority;
            }
            if(a.dueDate && b.dueDate){
                return a.dueDate < b.dueDate ? -1 : 1
            }
            if(a.dueDate && !b.dueDate){
                return -1;
            }
            if(!a.dueDate && b.dueDate){
                return 1;
            }
            return (b.createdAt || '').localeCompare(a.createdAt || '')
        })
    }
);

export const selectRemaining = createSelector(
    [selectTodos],
    (list) : number => {
        const activeTasks = list.map((toDo) => !toDo.done);
        return activeTasks.length;
    } 
);
