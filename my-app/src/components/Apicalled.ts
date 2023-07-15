import axios from "axios"


export type Todo = {
    id?: number,
    title: string,
    completed: boolean
}


export const setdata = async (obj: Todo) => {
    await axios.post("https://stamurai.onrender.com/posts", obj)

}

