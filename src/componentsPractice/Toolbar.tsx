import React from "react";

// FILTERS is assumed to be imported or defined elsewhere
// e.g. const FILTERS = ["all", "active", "completed"];

export default function Toolbar({ clearToDos, remaining, setFilter }) {
    return (
        <>
            {FILTERS.map((filterOption) => (
                <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                >
                    {filterOption[0].toUpperCase() + filterOption.slice(1)}
                </button>
            ))}

            <button onClick={clearToDos}>Clear</button>

            <div>
                {remaining} Remaining
            </div>
        </>
    );
}