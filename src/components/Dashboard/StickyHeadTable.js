'use client'
import { useState, useEffect } from 'react'
import EditModal from '@/components/Modal/EditModal'
import DeleteModal from '@/components/Modal/DeleteModal'
import UserTable from '@/components/Dashboard/UserTable'
import { httpClient } from '@/utils/api'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function StickyHeadTable({
    edit_user_permission,
    delete_user_permission,
}) {
    const router = useRouter()
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

    const users = useSelector((state) => state.usersSlice.users)
    const permissionsList = useSelector(
        (state) => state.permissionsSlice.permissions
    )

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

            if (res.data.detail) {
                alert(res.data.detail)
                router.refresh()
            }
        } catch (err) {
            console.error('Error saving edit:', err)
            alert('Failed to save the changes. Please try again.')
        } finally {
            setOpenModal({ edit: false, delete: false })
        }
    }

    const confirmDelete = async () => {
        if (!currentUser) {
            console.error('No user selected for deletion.')
            return
        }

        try {
            const res = await httpClient.delete(`/user/${currentUser.id}/`)
            if (res.data.detail) {
                alert(res.data.detail)
                router.refresh()
            }
        } catch (err) {
            console.error('Error deleting user:', err)
        }

        setOpenModal({ edit: false, delete: false })
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
                edit_user_permission={edit_user_permission}
                delete_user_permission={delete_user_permission}
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
