import React from "react";

export default function AppWrapper({
    children
}) {
    return (
        <main className='relative w-screen h-screen flex justify-center items-center'>
            <div className='fog-top' />
            {children}
            <div className='fog-bottom' />
        </main>
    )
}