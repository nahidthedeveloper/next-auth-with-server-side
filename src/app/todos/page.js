import TodoListTable from '@/components/todos/TodoListTable'
import { createHttpServer } from '@/utils/api_server'

const httpServer = await createHttpServer()

export async function fetchTodos() {
    try {
        const res = await httpServer.get('/todos/')
        return { todos: res.data }
    } catch (err) {
        return { todos: [] }
    }
}
// export async function fetchUserPermissions() {
//     try {
//         const res = await httpServer.get('/user/user_permissions/')
//         return { user_permissions: res.data.user_permissions }
//     } catch (err) {
//         return { user_permissions: [] }
//     }
// }

export default async function View() {
    const { todos } = await fetchTodos()
    // const { user_permissions } = await fetchTodos()

    return <TodoListTable todos={todos} />
}
