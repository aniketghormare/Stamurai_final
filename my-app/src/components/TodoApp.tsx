"use client"
import { setdata } from '@/apicalled'
import React, { useState } from 'react'

const TodoApp = () => {
    const [todo,setTodo]=useState<string>("")

    const handlesubmit=(e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault()
          const obj={
            title: todo,
            completed: false
          }
          setdata(obj)
          setTodo("")
         
    }
    
   
  return (
    <div>
        <h1 className='text-center text-5xl'>TodoApp</h1>
        <br />
        <form action="" className='flex flex-col' onSubmit={handlesubmit} >
            <input className='bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500' type="text" placeholder='AddTodo'value={todo} onChange={(e)=>setTodo(e.target.value)} />
           <br />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit' >Add Todo</button>
        </form>
        <br />
    </div>
  )
}

export default TodoApp