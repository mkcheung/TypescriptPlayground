import React from 'react';
import { Filter, FILTERS } from '../typesAndInterfaces';
import { ToolBarProps } from '../typesAndInterfaces';

export default function Toolbar({setFilter, remaining, clearToDos}:ToolBarProps) {
    return (
        <>
            { 
                FILTERS.map((item) => (
                    <button onClick={() => setFilter(item)}>{item[0].toUpperCase()+item.slice(1)}</button>
                ))
            }
            <button onClick={() => clearToDos()}>Clear To Dos</button>
            <div>
                {remaining} remaining
            </div>
        </>
    )
}