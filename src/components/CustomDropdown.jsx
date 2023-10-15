import React from "react";
import ReactDropdown from "react-dropdown";

export default function CustomDropdown({
    options,
    value,
    onSelect
}) {
    return (
        <section
            className='z-[99] absolute max-w-full top-12 lg:top-8 shadow-2xl backdrop-blur-lg p-4 rounded-3xl'
        >
            <ReactDropdown
                className='dropdown-children'
                menuClassName='pt-4 dropdown-menu overflow-y-auto max-h-[40vh]'
                options={options}
                value={value}
                onChange={({value}) => onSelect(value)}
            />
        </section>
    )
}