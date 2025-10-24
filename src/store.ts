import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import {
    configureStore,
    createAction,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'
import type {
    FILTER,
    PRIORITY,
    ToDo
} from './typesAndInterfaces'

function load(): ToDo[] {
    try {
        return JSON.parse(localStorage.getItem('toDos') || '[]');
    } catch {
        return [];
    }
}


const initialState: ToDo[] = load();

type AddPayload = { task: string; priority: PRIORITY; dueDate?: string }

export const toDoSlice = createSlice({
    name: 'toDos',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<AddPayload>) => {
            const todaysDate = new Date().toISOString().slice(0, 10);
            state.push({
                id: Date.now().toString(),
                task: action.payload.task,
                priority: action.payload.priority,
                dueDate: action.payload.dueDate,
                createdAt: todaysDate,
                done: false
            })
        },
        clear: () => [],
        remove: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(task => task.id !== action.payload.id)
        },
        toggle: (state, action: PayloadAction<{ id: string }>) => {
            const task = state.find(t => (t.id === action.payload.id))
            if (task) {
                task.done = !task.done;
            }
        },
        hydrate: (_state, action: PayloadAction<ToDo[]>) => action.payload,
    }
});

export const { add, toggle, remove, clear } = toDoSlice.actions;
export const appStarted = createAction('app/started');

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        dueDate: '',
        filter: 'all' as FILTER,
        priority: 'medium' as PRIORITY,
        task: '',
    },
    reducers: {
        setDueDate: (state, action: PayloadAction<{ dueDate: string }>) => {
            state.dueDate = action.payload.dueDate;
        },
        setFilter: (state, action: PayloadAction<{ filter: FILTER }>) => {
            state.filter = action.payload.filter;
        },
        setPriority: (state, action: PayloadAction<{ priority: PRIORITY }>) => {
            state.priority = action.payload.priority;
        },
        setTask: (state, action: PayloadAction<{ task: string }>) => {
            state.task = action.payload.task;
        }
    }
})

export const { setDueDate, setFilter, setPriority, setTask } = uiSlice.actions;

// const persist = (storeAPI:any) => (next:any) => (action:any) => {
//     const result = next(action);
//     const state = storeAPI.getState();
//     localStorage.setItem('toDos', JSON.stringify(state.todos));
//     return result;
// }

const sagaMw = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        toDos: toDoSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefault) => getDefault({ thunk: false }).concat(sagaMw),
});

function* rootSaga() {
    yield all([
        // put watchers here (persistence, ui, optimistic)
    ]);
}

sagaMw.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;