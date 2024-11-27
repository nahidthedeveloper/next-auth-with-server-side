'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { httpClient } from '@/utils/api'
import { TokenContext } from '@/context/tokenContext'

export const UserPermissionsContext = createContext()

async function fetchUserPermissions() {
    try {
        const res = await httpClient.get('/user/user_permissions/')
        return { user_permissions: res.data.user_permissions }
    } catch (err) {
        console.error('Error fetching user permissions:', err)
        return { user_permissions: [] }
    }
}

export const UserPermissions = ({ children }) => {
    const [isManualRefresh, setIsManualRefresh] = useState(false)
    const tokenContext = useContext(TokenContext)

    useEffect(() => {
        if (typeof window === 'undefined') return

        if (tokenContext === 'added') {
            const setUserPermissions = async () => {
                const entries = performance.getEntriesByType('navigation')
                const isReload = entries[0]?.type === 'reload'
                console.log('Page reload:', isReload)

                if (isReload) {
                    const userPermissions = await fetchUserPermissions()
                    setIsManualRefresh(true)

                    Cookies.set('user_permissions', JSON.stringify(userPermissions.user_permissions), {
                        path: '/',
                        sameSite: 'Lax',
                    })
                    console.log('Cookie set:', userPermissions.user_permissions)
                }
            }

            setUserPermissions()
        }
    }, [tokenContext])

    return (
        <UserPermissionsContext.Provider value={{ isManualRefresh }}>
            {children}
        </UserPermissionsContext.Provider>
    )
}
