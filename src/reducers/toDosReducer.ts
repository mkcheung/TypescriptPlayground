
import { ToDo, ACTIONS } from '../typesAndInterfaces'

export function toDosReducer(state: ToDo[], action: ACTIONS): ToDo[] {
    switch(action.type){
        case 'add':
            return [...state, {id:Date.now().toString(), task:action.task, done:false}];
        case 'remove':
            return state.filter(toDo => (
                toDo.id !== action.id
            ));
        case 'toggle':
            return state.map(toDo => (
                toDo.id === action.id ? {...toDo, done:!toDo.done} : toDo
            ));
        case 'clear':
            return [];
        default:
            const exhaustiveCheck: never = action.type;
            return state;
    }
}