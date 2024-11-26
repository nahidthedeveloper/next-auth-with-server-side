import ListTable from '@/components/todo/ListTable'
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

export default async function View() {
    const { todos } = await fetchTodos()

    return <ListTable todos={todos} />
}
