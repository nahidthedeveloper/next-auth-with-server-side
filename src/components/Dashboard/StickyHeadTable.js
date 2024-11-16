'use client'
import { useState, useEffect } from 'react'
import EditModal from '@/components/Modal/EditModal'
import DeleteModal from '@/components/Modal/DeleteModal'
import UserTable from '@/components/Dashboard/UserTable'
import { httpClient } from '@/utils/api'

export default function StickyHeadTable({ initialUsers, permissionsList }) {
    const [users, setUsers] = useState(initialUsers)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openModal, setOpenModal] = useState({ edit: false, delete: false })
    const [currentUser, setCurrentUser] = useState(null)
    const [userRole, setUserRole] = useState('')
    const [userPermissions, setUserPermissions] = useState([])

    const handleChangePage = (_, newPage) => setPage(newPage)
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const openEditModal = (user) => {
        setCurrentUser(user)
        setUserRole(user.role || '')
        setUserPermissions(user.permissions || [])
        setOpenModal({ edit: true, delete: false })
    }

    const openDeleteModal = (user) => {
        setCurrentUser(user)
        setOpenModal({ edit: false, delete: true })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    const handleSaveEdit = async () => {
        const payload = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            role: userRole,
            permissions: userPermissions,
        }
        try {
            const res = await httpClient.patch(
                `/user/${currentUser.id}/`,
                payload
            )
            alert(res.data.detail)

            const updatedUsers = await fetchUser()
            setUsers(updatedUsers.users)
        } catch (err) {
            console.log(err)
        }
        setOpenModal({ edit: false, delete: false })
    }

    const confirmDelete = async () => {
        try {
            const res = await httpClient.delete(`/user/${currentUser.id}/`)
            alert(res.data.detail)
            const updatedUsers = await fetchUser()
            setUsers(updatedUsers.users)
        } catch (err) {
            console.log(err)
        }
        setOpenModal({ edit: false, delete: false })
    }
    
    async function fetchUser() {
        try {
            const res = await httpClient.get('/user/')
            return {
                users: res.data,
            }
        } catch (err) {
            console.log(err)
            return {
                users: [],
            }
        }
    }

    return (
        <>
            <UserTable
                users={users}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleEdit={openEditModal}
                handleDelete={openDeleteModal}
            />

            {/* Modals */}
            <EditModal
                permissionsList={permissionsList}
                open={openModal.edit}
                user={currentUser}
                userRole={userRole}
                handleInputChange={handleInputChange}
                userPermissions={userPermissions}
                setUserPermissions={setUserPermissions}
                handleClose={() => setOpenModal({ edit: false, delete: false })}
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
                open={openModal.delete}
                user={currentUser}
                handleClose={() => setOpenModal({ edit: false, delete: false })}
                handleConfirm={confirmDelete}
            />
        </>
    )
}
