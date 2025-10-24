import { 
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach 
} from 'vitest'

import {toDoSlice, add, toggle, remove, clear } from './store'

import { ToDo } from './typesAndInterfaces';

const toDosReducer = toDoSlice.reducer;

describe('todosSlice.reducer', () => {
    it('add', () => {
        const next = toDosReducer([], add({task: 'Testing123', priority:'high'}));
        expect(next).toHaveLength(1);
        expect(next[0]).toMatchObject({task:'Testing123', priority:'high', done:false});
        expect(typeof next[0].id).toBe('string');
    });
    it('toggle', () => {
        const start: ToDo[] = [{id:'testA', task:'Testing123', priority:'high', done:false, createdAt:new Date().toISOString().slice(0,10)}];
        const next = toDosReducer(start, toggle({id:'testA'}));
        expect(next).toHaveLength(1);
        expect(typeof next[0].id).toBe('string');
        expect(next[0].done).toBe(true);
    });
    it('remove', () => {
        const start: ToDo[] = [{id:'testA', task:'Testing123', priority:'high', done:false, createdAt:new Date().toISOString().slice(0,10)}];
        const next = toDosReducer(start, remove({id:'testA'}));
        expect(next).toHaveLength(0);
    });
    it('clear', () => {
        const start: ToDo[] = [{id:'testA', task:'Testing123', priority:'high', done:false, createdAt:new Date().toISOString().slice(0,10)}];
        const next = toDosReducer(start, clear());
        expect(next).toHaveLength(0);
    });
})