import React from 'react'
import UploadForm from '@/components/UploadForm'
export default function page() {
    return (
        <main className='wrapper container'>
            <div className='mx-auto max-w-180 space-y-10'>
                <section className='flex flex-col gap-5 '>
                    <h1 className='text-4xl font-bold '>Add New Book</h1>
                    <p className='subtitle '>Add a new book to your library</p>

                </section>
                <UploadForm />






            </div>







        </main>
    )
}