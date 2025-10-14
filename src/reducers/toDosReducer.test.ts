import { 
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach 
} from 'vitest'
import { toDosReducer } from './toDosReducer'
import type { ToDo } from '../typesAndInterfaces'

describe('toDosReducer', () => {
    const fixed = new Date('2025-10-14T08:00:00.000Z');
    beforeEach(()=>{
        vi.useFakeTimers();
        vi.setSystemTime(fixed);
    });

    afterEach(()=>{
        vi.useRealTimers();
    });

    it('adds a task', () => {
        const state:ToDo[] = [];
        const todaysDateTime = new Date();
        const dueDateTime = new Date(todaysDateTime.getTime() + 3 * 24 * 60 * 1000);
        const todaysDate = todaysDateTime.toISOString().slice(0, 10);
        const dueDate = dueDateTime.toISOString().slice(0, 10);
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
