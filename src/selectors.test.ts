import { 
    afterEach, 
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import type { RootState } from './store';
import { selectBaseFiltered } from './selectors'

describe('testSelectors', () => {
    const fixed = new Date('2025-10-14T08:00:00.000Z');
    const fixedInISO = fixed.toISOString().slice(0,10);
    const threeDaysAhead = new Date(fixed.getTime() + 3 * 24 * 60 * 60 * 1000);
    const threeDaysAheadInISO = threeDaysAhead.toISOString().slice(0,10);
    const threeDaysBefore = new Date(fixed.getTime() - 3 * 24 * 60 * 60 * 1000);
    const threeDaysBeforeInISO = threeDaysBefore.toISOString().slice(0,10);
    beforeEach(()=>{
        vi.useFakeTimers();
        vi.setSystemTime(fixed);
    });

    afterEach(()=>{
        vi.useRealTimers();
    });
    it('select active tasks', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: '2025-11-11T00:00:00.000Z',
                    priority: 'low',
                    createdAt: fixedInISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: threeDaysBeforeInISO,
                    priority: 'high',
                    createdAt: fixedInISO,
                    done: true,
                }
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                priority: 'medium',
                task: '',
            },
        } as RootState;
        const result = selectBaseFiltered(fakeState)
        expect(result).toHaveLength(1);
        expect(result[0].id).toEqual('temp1');
    });

    it('select completed tasks', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: threeDaysBeforeInISO,
                    priority: 'low',
                    createdAt: fixedInISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: threeDaysBeforeInISO,
                    priority: 'high',
                    createdAt: fixedInISO,
                    done: true,
                }
            ],
            ui: {
                filter: 'completed',
                dueDate: '',
                priority: 'medium',
                task: '',
            },
        } as RootState;
        const result = selectBaseFiltered(fakeState)
        expect(result).toHaveLength(1);
        expect(result[0].id).toEqual('temp2');
    });

    it('select tasks due today', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: fixedInISO,
                    priority: 'medium',
                    createdAt: fixedInISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: threeDaysBeforeInISO,
                    priority: 'medium',
                    createdAt: fixedInISO,
                    done: true,
                }
            ],
            ui: {
                filter: 'today',
                dueDate: '',
                priority: 'medium',
                task: '',
            },
        } as RootState;
        console.log(fixedInISO);
        const result = selectBaseFiltered(fakeState)
        expect(result).toHaveLength(1);
        expect(result[0].id).toEqual('temp1');
    });

    it('select overdue tasks', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: threeDaysBeforeInISO,
                    priority: 'low',
                    createdAt: fixedInISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: threeDaysBeforeInISO,
                    priority: 'high',
                    createdAt: fixedInISO,
                    done: false,
                }
            ],
            ui: {
                filter: 'overdue',
                dueDate: '',
                priority: 'medium',
                task: '',
            },
        } as RootState;
        const result = selectBaseFiltered(fakeState)
        expect(result).toHaveLength(2);
        expect(result[0].id).toEqual('temp1');
        expect(result[1].id).toEqual('temp2');
    });
})