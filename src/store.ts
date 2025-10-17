import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ToDo, PRIORITY } from './typesAndInterfaces'

function load():ToDo[]{
    try {
        return JSON.parse(localStorage.getItem('toDos') || '[]');
    } catch {
        return [];
    }
}

const initialState: ToDo[] = load();

type AddPayload = { task:string; priority:PRIORITY; dueDate?:string }

const toDoSlice = createSlice({
    name: 'toDos',
    initialState,
    reducers: {
        add:(state, action: PayloadAction<AddPayload>) => {
            const todaysDate = new Date().toISOString().slice(0,10);
            state.push({
                id: Date.now().toString(),
                task:action.payload.task,
                priority:action.payload.priority,
                dueDate:action.payload.dueDate,
                createdAt:todaysDate,
                done:false
            })
        },
        toggle:(state, action: PayloadAction<{id:string}>) => {
            const task = state.find(t => (t.id === action.payload.id ))
            if(task){
                task.done = !task.done;
            }
        },
        remove:(state, action: PayloadAction<{id:string}>) => {
            state.filter(task => task.id !== action.payload.id)
        },
        clear: () => []
    }
});

const persist = (storeAPI:any) => (next:any) => (action:any) => {
    const result = next(action);
    const state = storeAPI.getState();
    localStorage.setItem('toDos', JSON.stringify(state.todos));
    return result;
}

export const { add, toggle, remove, clear } = toDoSlice.actions;
 
export const store = configureStore({
    reducer: { todos: toDoSlice.reducer},
    middleware: (gdm) => gdm().concat(persist)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;