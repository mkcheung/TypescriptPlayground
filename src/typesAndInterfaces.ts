export interface ToDo {
    id:string
    task:string
    dueDate?: string
    priority: PRIORITY
    createdAt:string
    done:boolean
}

export interface ToDoListProps {
    visibleToDos: ToDo[],
    toggleTask: (id:string) => void,
    removeTask: (id:string) => void
}

export interface ToolBarProps {
    remaining: number;
    clearToDos: () => void;
}

export type ACTIONS = { type: 'add'; dueDate?:string; priority:PRIORITY; createdAt:string; task:string } | { type:'remove'; id:string } | { type: 'toggle'; id:string } | { type: 'clear'}

export type FILTER = 'all' | 'active' | 'completed' | 'today' | 'overdue';
export const FILTERS = ['all', 'active', 'completed', 'today' , 'overdue'] as const satisfies readonly FILTER[];

export type PRIORITY = 'low' | 'medium' | 'high';
export const PRIORITIES = ['low', 'medium', 'high'] as const satisfies readonly PRIORITY[];