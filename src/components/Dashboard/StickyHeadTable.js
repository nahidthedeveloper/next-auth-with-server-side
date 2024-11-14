'use client'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useSession } from 'next-auth/react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const columns = [
    { id: 'list', label: 'No.', minWidth: 50, align: 'center' },
    { id: 'username', label: 'Username', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 170, align: 'left' },
    { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
]

export default function StickyHeadTable({ users }) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openPermissionModal, setOpenPermissionModal] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const { status } = useSession()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleEdit = (user) => {
        setCurrentUser(user)
        setOpenEditModal(true)
    }

    const handlePermission = (user) => {
        setCurrentUser(user)
        setOpenPermissionModal(true)
    }

    const closeEditModal = () => setOpenEditModal(false)
    const closePermissionModal = () => setOpenPermissionModal(false)

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
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEdit(user)}
                                            style={{ marginRight: '8px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                handlePermission(user)
                                            }
                                        >
                                            Permission
                                        </Button>
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

            {/* Edit Modal */}
            <Dialog open={openEditModal} onClose={closeEditModal}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit details for {currentUser?.username}.
                    </DialogContentText>
                    {/* Add form fields for editing user details */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closeEditModal} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Permission Modal */}
            <Dialog open={openPermissionModal} onClose={closePermissionModal}>
                <DialogTitle>Set Permissions</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set permissions for {currentUser?.username}.
                    </DialogContentText>
                    {/* Add form fields for setting permissions */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePermissionModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closePermissionModal} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
