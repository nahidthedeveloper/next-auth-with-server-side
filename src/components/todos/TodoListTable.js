'use client'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import { useState } from 'react'
import { IconButton, TextField, Button, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { httpClient } from '@/utils/api'
import { useRouter } from 'next/navigation'

const TodoListTable = ({ todos, onSave, onDelete }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [editingId, setEditingId] = useState(null)
    const [editedTodo, setEditedTodo] = useState('')
    const [createValue, setCreateValue] = useState('')

    const router = useRouter()

    const handleChangePage = (_, newPage) => setPage(newPage)
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const handleCreateTodo = async () => {
        try {
            const res = await httpClient.post(`/todos/`, {
                todo: createValue,
            })
            if (res.data.detail) {
                alert(res.data.detail)
                setCreateValue('')
                router.refresh()
            }
        } catch (err) {      
            if (err.response.data.todo) {
                alert(err.response.data.todo[0])
            }
            if (err.response.data.detail) {
                alert(err.response.data.detail)
            }
        }
    }

    const handleEdit = (todo) => {
        setEditingId(todo.id)
        setEditedTodo(todo.todo)
    }

    const handleCancel = () => {
        setEditingId(null)
        setEditedTodo('')
    }

    const handleSave = async (id) => {
        try {
            const res = await httpClient.patch(`/todos/${id}/`, {
                todo: editedTodo,
            })
            if (res.data.detail) {
                alert(res.data.detail)
                router.refresh()
                setEditingId(null)
                setEditedTodo('')
            }
        } catch (err) {
            if (err.response.data.todo) {
                alert(err.response.data.todo[0])
            }
            if (err.response.data.detail) {
                alert(err.response.data.detail)
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await httpClient.delete(`/todos/${id}/`)
            if (res.data.detail) {
                alert(res.data.detail)
                router.refresh()
            }
        } catch (err) {
            if (err.response.data.detail) {
                alert(err.response.data.detail)
            }
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    my: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: '50%' }}
                    value={createValue}
                    onChange={(e) => setCreateValue(e.target.value)}
                />
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => handleCreateTodo()}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    style={{ width: 100 }}
                                >
                                    No.
                                </TableCell>
                                <TableCell style={{ minWidth: 170 }}>
                                    Todo
                                </TableCell>
                                <TableCell
                                    style={{ width: 150 }}
                                    align="center"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos
                                ?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((todo, index) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={todo.id}
                                    >
                                        <TableCell align="center">
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === todo.id ? (
                                                <Box display="flex" gap={1}>
                                                    <TextField
                                                        fullWidth
                                                        value={editedTodo}
                                                        sx={{
                                                            height: '40px',
                                                            '& .MuiInputBase-root':
                                                                {
                                                                    height: '40px',
                                                                },
                                                        }}
                                                        onChange={(e) =>
                                                            setEditedTodo(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ height: '40px' }}
                                                        onClick={() =>
                                                            handleSave(todo.id)
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        sx={{ height: '40px' }}
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            ) : (
                                                todo.todo
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() =>
                                                    editingId
                                                        ? handleCancel()
                                                        : handleEdit(todo)
                                                }
                                                color="primary"
                                                style={{ marginRight: '8px' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    handleDelete(todo.id)
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={todos?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default TodoListTable
