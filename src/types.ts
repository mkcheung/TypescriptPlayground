export interface ToDo {
    id:string
    task:string
    done:boolean
}

export type Filter = 'all' | 'active' | 'completed';

export const FILTERS = ['all', 'active', 'completed'] as const satisfies readonly Filter[];