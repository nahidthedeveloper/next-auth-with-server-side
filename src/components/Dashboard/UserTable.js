import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TablePagination from '@mui/material/TablePagination'

const columns = [
    { id: 'list', label: 'No.', minWidth: 50, align: 'center' },
    { id: 'username', label: 'Username', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 170, align: 'left' },
    { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
]

export default function UserTable({
    users,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
}) {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((user, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={user.id}
                                >
                                    <TableCell align="center">
                                        {index + 1}
                                    </TableCell>
                                    {columns.slice(1, -1).map((column) => {
                                        const value = user[column.id]
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleEdit(user)}
                                            color="primary"
                                            style={{ marginRight: '8px' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(user)}
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
