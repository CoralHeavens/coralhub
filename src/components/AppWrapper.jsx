import React from "react";

export default function AppWrapper({
    children
}) {
    return (
        <main className='relative w-screen h-screen flex justify-center items-center'>
            <div className='pointer-events-none absolute top-0 left-0 w-screen h-[20vh] bg-gradient-to-b from-black to-[0, 0, 0, 0]' />
            {children}
            <div className='pointer-events-none absolute bottom-0 left-0 w-screen h-[20vh] bg-gradient-to-t from-black to-[0, 0, 0, 0]' />
        </main>
    )
}