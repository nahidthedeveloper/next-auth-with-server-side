'use client'

import { useState } from 'react'
import EditModal from '@/components/Modal/EditModal'
import DeleteModal from '@/components/Modal/DeleteModal'
import UserTable from '@/components/Dashboard/UserTable'

const roles = ['Admin', 'Manager', 'User']
const permissionsList = ['Read', 'Write', 'Execute', 'Delete']

export default function StickyHeadTable({ users }) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [userRole, setUserRole] = useState('')
    const [userPermissions, setUserPermissions] = useState([])

    const handleChangePage = (event, newPage) => setPage(newPage)
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleEdit = (user) => {
        setCurrentUser(user)
        setUserRole(user.role || '')
        setUserPermissions(user.permissions || [])
        setOpenEditModal(true)
    }

    const handleDelete = (user) => {
        setCurrentUser(user)
        setOpenDeleteModal(true)
    }

    const handleSaveEdit = () => {
        console.log('Saved changes for', currentUser)
        setOpenEditModal(false)
    }

    const confirmDelete = () => {
        console.log(`User ${currentUser?.username} deleted.`)
        setOpenDeleteModal(false)
    }

    return (
        <>
            <UserTable
                users={users}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {/* Modals */}
            <EditModal
                open={openEditModal}
                user={currentUser}
                roles={roles}
                permissionsList={permissionsList}
                userRole={userRole}
                userPermissions={userPermissions}
                handleClose={() => setOpenEditModal(false)}
                handleRoleChange={(e) => setUserRole(e.target.value)}
                handlePermissionsChange={(e) =>
                    setUserPermissions(
                        typeof e.target.value === 'string'
                            ? e.target.value.split(',')
                            : e.target.value
                    )
                }
                handleSave={handleSaveEdit}
            />
            <DeleteModal
                open={openDeleteModal}
                user={currentUser}
                handleClose={() => setOpenDeleteModal(false)}
                handleConfirm={confirmDelete}
            />
        </>
    )
}
