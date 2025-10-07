import React from 'react';

import { 
    type Filter,
    FILTERS
} from '../typesAndInterfaces';

interface ToolbarProps {
    setFilter: (item: Filter) => void;
    clearToDos: () => void;
    remaining: number;
}

export default function Toolbar ({setFilter, clearToDos, remaining}: ToolbarProps) {
    return (
        <>
            {
                FILTERS.map((item) => (
                    <button key={item} onClick={() => setFilter(item)}>{item[0].toUpperCase()+item.slice(1)}</button>
                ))
            }
            <button onClick={clearToDos} style={{ marginLeft: "1rem", color: "red" }}>
                Reset
            </button>
            <div>
                {remaining} remaining
            </div>
        </>
    )
}