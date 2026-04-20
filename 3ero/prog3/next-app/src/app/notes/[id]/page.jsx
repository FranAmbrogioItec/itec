import React from 'react'
import Link from 'next/link'


export default async function page({ params }) {

    const { id } = await params

    // funcion buscar notas (localhost:3000/notes/{id}) => me trae un objeto nota {id: 1, title: "Nota 1", content: "Contenido de la nota 1"}

    const nota = {
        id: 1,
        title: "Arrays",
        content: "Los arrays son una estructura de datos que nos permiten almacenar multiples valores en una sola variable. En JavaScript, los arrays se definen utilizando corchetes [] y pueden contener cualquier tipo de dato, incluyendo otros arrays. Por ejemplo:",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        {nota.title}
                    </h1>
                </div>

                <p className='text-justify'>
                    {nota.content}
                </p>

                {/* Ejemplo de como funcionan los arrays */}
                <section className='w-full h-64 my-8 p-4 rounded-lg flex flex-col bg-zinc-800 text-white justify-between'>
                    <p className='text-lg font-semibold'>Ejemplo Arrays</p>
                    <pre className='text-sm text-white bg-black rounded p-2'>
                        <code >
                            {`
[
  {id: 1, title: "Nota 1", content: "Contenido de la nota 1"},
  {id: 2, title: "Nota 2", content: "Contenido de la nota 2"},
  {id: 3, title: "Nota 3", content: "Contenido de la nota 3"},
]
              `}
                        </code>
                    </pre>
                </section>

            </main>
        </div>
    )
}