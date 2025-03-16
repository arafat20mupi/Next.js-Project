'use client' 

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
            <h2 className=' text-2xl '>Something went wrong!</h2>
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    )
}