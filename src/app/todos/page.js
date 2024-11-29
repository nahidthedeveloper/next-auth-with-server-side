import TodoListTable from '@/components/todos/TodoListTable'
import { createHttpServer } from '@/utils/api_server'
import { cookies } from 'next/headers'

const httpServer = await createHttpServer()

export async function fetchTodos() {
    try {
        const res = await httpServer.get('/todos/')
        return { todos: res.data }
    } catch (err) {
        return { todos: [] }
    }
}

export default async function View() {
    const cookieStore = cookies()
    const userPermissions = await cookieStore.get('user_permissions')
    const { todos } = await fetchTodos()

    return <TodoListTable todos={todos} userPermissions={JSON.parse(userPermissions.value)}/>
}
