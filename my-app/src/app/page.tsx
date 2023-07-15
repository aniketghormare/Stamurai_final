import DisplayTodo from '@/components/DisplayTodo'
import TodoApp from '@/components/TodoApp'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
     
      <TodoApp/>
      <DisplayTodo/>
    </main>
  )
}
