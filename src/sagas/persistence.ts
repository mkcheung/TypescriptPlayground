import { call, put, take, select, debounce, takeEvery } from 'redux-saga/effects';
import { add, toggle, remove, clear, hydrate } from '../store';
import { appStarted, RootState} from '../store';
import type { ToDo } from '../typesAndInterfaces';

function load(key: string){
    try{
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
        return null;
    }
}

/******************* Worker sagas *******************/
function save(key:string, value:unknown){
    localStorage.setItem(key, JSON.stringify(value));
}

function removeKey(key:string){
    localStorage.removeItem(key);
}

function* loadTodosOnStart(){
    // check to see that the app has mounted/loaded
    yield take(appStarted.type);
    const data = (yield call(load, 'toDos')) as ToDo[]
    if(Array.isArray(data)){
        yield put(hydrate(data))
    }
}

function* saveTodosWorker(){
    const toDos : ToDo[] = yield select((s:RootState) => s.toDos)
    yield call(save, 'toDos', toDos)
}

function* clearStorageWorker(){
    yield call(removeKey, 'toDos');
}

/******************* Watcher sagas *******************/
export function* persistenceWatchers(){
    yield call(loadTodosOnStart);
    yield debounce(250, [add.type, remove.type, toggle.type], saveTodosWorker);
    yield takeEvery(clear.type, clearStorageWorker)
}