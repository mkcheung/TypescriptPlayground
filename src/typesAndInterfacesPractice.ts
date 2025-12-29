
export interface ToDo {
    id:string;
    task:string;
    done:boolean;
}
export interface ToDoFormProps {
    handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
    setTask: (value:string) => void;
    task: string;
}

export interface ToDoListProps {
    visibleToDos: ToDo[];
    toggleTask: (s:string) => void;
    removeTask: (s:string) => void;
}

export interface ToolbarProps {
    setFilter: (filter:FILTER) => void;
    remaining:number;
    clearToDos: () => void;
}

export type ACTIONS = {type:'add', task:string} | {type:'toggle', id:string} | {type:'remove', id:string} | {type:'clear'}

export type FILTER = 'all' | 'active' | 'completed';

export const FILTERS = ['all', 'active', 'completed'] as const satisfies readonly FILTER[];

