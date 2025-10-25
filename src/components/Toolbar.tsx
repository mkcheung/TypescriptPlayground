import React from 'react';
import { 
    useDispatch
} from 'react-redux';
import { 
    AppDispatch,
    setFilter,
} from './../store';
import { FILTERS } from '../typesAndInterfaces';
import { ToolBarProps } from '../typesAndInterfaces';

export default function Toolbar({remaining, clearToDos}:ToolBarProps) {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            { 
                FILTERS.map((item) => (
                    <button key={item} onClick={() => dispatch(setFilter({filter:item}))}>{item[0].toUpperCase()+item.slice(1)}</button>
                ))
            }
            <button onClick={() => clearToDos()}>Clear To Dos</button>
            <div>
                {remaining} remaining
            </div>
        </>
    )
}