export interface ToDo {
    id:string
    task:string
    done:boolean
}

export type Action = | { type: 'add'; task:string } | { type:'remove'; id:string } | { type: 'toggle'; id:string } | { type: 'clear'}

export type Filter = 'all' | 'active' | 'completed';

export const FILTERS = ['all', 'active', 'completed'] as const satisfies readonly Filter[];