import { 
    afterEach, 
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import type { RootState } from './store';
import { 
    selectBaseFiltered,
    selectRemaining,
    selectVisibleToDos
 } from './selectors'

describe('test base filtered selectors', () => {
    const fixed = new Date('2025-10-14T08:00:00.000Z');
    const fixedInISO = fixed.toISOString().slice(0,10);
    const threeDaysAhead = new Date(fixed.getTime() + 3 * 24 * 60 * 60 * 1000);
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
});

describe('test visible to do selectors', () => {
    const fixed = new Date('2025-10-14T08:00:00.000Z');
    const fixedISO = fixed.toISOString().slice(0, 10);
    const threeDaysAhead = new Date(fixed.getTime() + 3 * 24 * 60 * 60 * 1000);
    const threeDaysAheadISO = threeDaysAhead.toISOString().slice(0, 10);
    const twoDaysAhead = new Date(fixed.getTime() + 2 * 24 * 60 * 60 * 1000);
    const twoDaysAheadISO = twoDaysAhead.toISOString().slice(0, 10);

    beforeEach(()=>{
        vi.useFakeTimers();
        vi.setSystemTime(fixed);
    });

    afterEach(()=>{
        vi.useRealTimers();
    });

    it('test high priority sort', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: threeDaysAheadISO,
                    priority: 'low',
                    createdAt: fixedISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: threeDaysAheadISO,
                    priority: 'high',
                    createdAt: fixedISO,
                    done: false,
                },
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                task: '',
            },
        } as RootState;
        const result = selectVisibleToDos(fakeState);
        expect(result[0].id).toBe('temp2');
        expect(result[0].priority).toBe('high');
        expect(result[1].id).toBe('temp1');
        expect(result[1].priority).toBe('low');
    });

    it('test due date sort', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: threeDaysAheadISO,
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: twoDaysAheadISO,
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                task: '',
            },
        } as RootState;
        const result = selectVisibleToDos(fakeState);
        expect(result[0].id).toBe('temp2');
        expect(result[1].id).toBe('temp1');
    });

    it('test missing duedate-A sort', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: '',
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: twoDaysAheadISO,
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                task: '',
            },
        } as RootState;
        const result = selectVisibleToDos(fakeState);
        expect(result[0].id).toBe('temp2');
        expect(result[1].id).toBe('temp1');
    });

    it('test missing duedate-B sort', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: twoDaysAheadISO,
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: '',
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                task: '',
            },
        } as RootState;
        const result = selectVisibleToDos(fakeState);
        expect(result[0].id).toBe('temp1');
        expect(result[1].id).toBe('temp2');
    });

    it('test no due dates sort', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: '',
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: '',
                    priority: 'medium',
                    createdAt: threeDaysAheadISO,
                    done: false,
                },
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                task: '',
            },
        } as RootState;
        const result = selectVisibleToDos(fakeState);
        expect(result[0].id).toBe('temp2');
        expect(result[1].id).toBe('temp1');
    });
});

describe('test remainder', () => {
    const fixed = new Date('2025-10-14T08:00:00.000Z');
    const fixedISO = fixed.toISOString().slice(0,10);
    beforeEach(()=>{
        vi.useFakeTimers();
        vi.setSystemTime(fixed);
    });

    afterEach(()=>{
        vi.useRealTimers();
    });

    it('test active filters', () => {
        const fakeState = {
            toDos: [
                {
                    id: 'temp1',
                    task: 'temp',
                    dueDate: '',
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: false,
                },
                {
                    id: 'temp2',
                    task: 'temp',
                    dueDate: '',
                    priority: 'medium',
                    createdAt: fixedISO,
                    done: true,
                },
            ],
            ui: {
                filter: 'active',
                dueDate: '',
                task: '',
            },
        } as RootState;
        const result = selectRemaining(fakeState);
        expect(result).toBe(1);
    });
});