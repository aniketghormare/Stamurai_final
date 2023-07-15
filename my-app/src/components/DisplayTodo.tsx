"use client"

import { Todo } from '@/components/Apicalled'
import React, { useEffect, useState } from 'react'
import axios from "axios"

type Toggle = {
  completed: boolean
}
const DisplayTodo = () => {
  const [posts, setposts] = useState([])
  const [visible, setvisible] = useState(false)
  const [editid, seteditid] = useState<number | undefined>(0)
  const [title,settitle]=useState("")
  
  const getdata = async () => {
    await fetch("https://stamurai.onrender.com/posts").then((res) => {
      return res.json()
    }).then((data) => {
      //console.log(data)
      setposts(data)
    }).catch((err) => {
      console.log(err)
    })

  }



  const handledelete = async (id: number | undefined) => {
    await axios.delete(`https://stamurai.onrender.com/posts/${id}`)


  }
  const handletoggle = async (id: number | undefined) => {
    let user = posts.filter((el, index) => {
      return el["id"] == id
    })
    console.log(user[0])
    let obj = {
      completed: !user[0]["completed"]
    }
    await axios.patch(`https://stamurai.onrender.com/posts/${id}`, obj)
  }
  const handleedit = (id: number | undefined) => {
    seteditid(id)
    setvisible(true)
  }
  const handlefinaledit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    let user = posts.filter((el, index) => {
      return el["id"] == editid
    })
   let obj = {
     title:title
  }
    await axios.patch(`https://stamurai.onrender.com/posts/${editid}`, obj)
    settitle("")
    setvisible(false)
  }


  useEffect(() => {
    getdata()
  }, [posts])
  return (
    <div>
      
      <div>
        <table className='border-solid border-2 border-black-600'>
          <tr>
            <th>S No</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {
            posts && posts.map((el: Todo, index) => {
              let newid=el.id
              return (
                <tr key={el.id} className='border-solid border-2 border-black-600'>
                  <td>{index + 1}</td>
                  <td>{el.title}</td>
                  <td>{el.completed ? "Completed" : "Pending"}</td>
                  <td className='gap-x-5'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => handletoggle(newid)}>Toggle</button>
                    <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleedit(newid)} >Edit</button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handledelete(newid)}>Delete</button>

                  </td>
                </tr>
              )
            })
          }
        </table>
        <br />
        {
          visible &&
          <div>
            <button onClick={() => setvisible((pre) => !pre)}>X</button>
            <div className='bg-pink h-auto flex flex-col m-auto'>
              
              
              <form action="" className='flex flex-col'>
                <input className='bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500' type="text" placeholder='Title' value={title} onChange={(e)=>settitle(e.target.value)}/>
                <br />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={handlefinaledit} >Edit</button>
              </form>
            
            </div>
          </div>

        }

      </div>
    </div>
  )
}

export default DisplayTodo


{/* <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  
</table> */}