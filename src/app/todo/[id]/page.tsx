import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {}

const page = async ({params}: {params: {id: number}}) => {

    const id = Number(params.id)

    const todo = await db.todo.findFirst({
        where: {id}
    })

    if(!todo) return notFound()


  return (
    <div>Todo SHow

        {todo.titulo}
    </div>
  )
}

export default page