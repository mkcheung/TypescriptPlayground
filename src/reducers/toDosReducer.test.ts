import { describe, it, expect } from 'vitest'
import { toDosReducer } from './toDosReducer'
import type { ToDo } from '../typesAndInterfaces'

// Small helper to create a typed initial array
// function makeState(items: Partial<ToDo>[]): ToDo[] {
//     return items.map((t, i) => ({
//         id: t.id ?? String(i + 1),
//         task: t.task ?? `Task ${i + 1}`,
//         done: t.done ?? false,
//         priority: t.priority ?? 'low',
//         createdAt: t.createdAt ?? '2025-10-10T00:00:00.000Z',
//         dueDate: t.dueDate,
//     }))
// }

describe('toDosReducer', () => {
    it('adds a task', () => {
        const state:ToDo[] = [];
        const dueDate = new Date('2025-11-01 00:00:00').toISOString().slice(0, 10);
        const todaysDate = new Date().toISOString().slice(0, 10);
        const next = toDosReducer(state, { type: 'add', task: 'Buy milk', priority: 'low', dueDate: dueDate, createdAt: todaysDate });

        expect(next).toHaveLength(1);
        expect(next[0].task).toBe('Buy milk');
        expect(next[0].priority).toBe('low');
        expect(next[0].createdAt).toBe(todaysDate);
        expect(next[0].done).toBe(false);
        expect(next[0].id).toBeDefined();

        expect(next).not.toBe(state);
    });

    it('toggles a task by id', () => {
        const state: ToDo[] = [
            {
                id: 'temp1',
                task: 'temp',
                dueDate: '2025-11-11T00:00:00.000Z',
                priority: 'low',
                createdAt: '2025-10-10T00:00:00.000Z',
                done: false,
            }
        ];
        const next = toDosReducer(state, { type: 'toggle', id: 'temp1' });
        expect(next[0].id).toBe('temp1');
        expect(next[0].done).toBe(true);

        expect(next).not.toBe(state);
    })

    it('removes a task by id', () => {
        const state: ToDo[] = [
            {
                id: 'temp1',
                task: 'temp',
                dueDate: '2025-11-11T00:00:00.000Z',
                priority: 'low',
                createdAt: '2025-10-10T00:00:00.000Z',
                done: false,
            }
        ]
        const next = toDosReducer(state, { type: 'remove', id: 'temp1' });
        expect(next).toHaveLength(0);
        expect(next).not.toBe(state)
    })

    it('clear task list', () => {
        const state: ToDo[] = [
            {
                id: 'temp1',
                task: 'temp',
                dueDate: '2025-11-11T00:00:00.000Z',
                priority: 'low',
                createdAt: '2025-10-10T00:00:00.000Z',
                done: false,
            },
            {
                id: 'temp2',
                task: 'temp2',
                dueDate: '2025-11-11T00:00:00.000Z',
                priority: 'medium',
                createdAt: '2025-10-10T00:00:00.000Z',
                done: true,
            }

        ]
        const next = toDosReducer(state, { type: 'clear' });
        expect(next).toHaveLength(0);
        expect(next).not.toBe(state)
    })
})
