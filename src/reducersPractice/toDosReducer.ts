import React from 'react'
import { ToDo, ACTIONS } from 'src/typesAndInterfacesPractice'

export function toDosReducer( state:ToDo[], action:ACTIONS ) {
    switch(action.type){
        case 'add':
            return [...state, {id:Date.now().toString(), dueDate?:(action.dueDate || undefined), task:action.task, done:false}];
        case 'remove':
            return state.filter(toDo => toDo.id !== action.id)
        case 'clear':
            return [];
        case 'toggle':
            return state.map(toDo => (toDo.id === action.id) ? {...toDo, done:!toDo.done} : toDo )
        default:
            const _exhaustiveCheck: never = action.type;
            return state
    }
}