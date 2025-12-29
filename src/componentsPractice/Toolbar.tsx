import React from 'react';

// import { FILTERS, ToolbarProps } from '../typesAndInterfacesPractice';

type FILTER = 'all' | 'active' | 'completed'

interface ToolbarProps {
    clearToDos: () => void
    remaining: number
    setFilter: (filter: FILTER) => void
}

export default function Toolbar({ clearToDos, remaining, setFilter }: ToolbarProps) {
    return (
        <>
            {FILTERS.map(filterOption => (
                <button key={filterOption} onClick={() => setFilter(filterOption)}>{filterOption[0].toUpperCase() + filterOption.slice(1)}</button>
            ))}
            <button onClick={() => clearToDos()}>Clear</button>
            <div>
                {remaining} Remaining
            </div>
        </>
    )
}