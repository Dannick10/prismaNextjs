import { findTodoById } from '@/app/actions'
import TodoForm from '@/components/Todoform'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {}

const page = async ({params}: {params: {id: number}}) => {
    const id = Number(params.id)

    const todo = await findTodoById(id);

    if (!todo) return notFound();
  
  
    return (
    <div>
        <TodoForm todo={todo} />
    </div>
  )
}

export default page