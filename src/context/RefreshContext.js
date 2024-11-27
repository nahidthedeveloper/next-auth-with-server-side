'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'

const RefreshContext = createContext()

export const RefreshProvider = ({ children }) => {
    const [isManualRefresh, setIsManualRefresh] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && performance.navigation) {
            if (
                performance.navigation.type ===
                performance.navigation.TYPE_RELOAD
            ) {
                setIsManualRefresh(true)
                console.log('I am from client cookie');

                Cookies.set('isRefresh', 'set', { path: '/' })
                console.log(
                    'Page was manually refreshed using the browser refresh button'
                )
            }
        }
    }, [])

    return (
        <RefreshContext.Provider value={{ isManualRefresh }}>
            {children}
        </RefreshContext.Provider>
    )
}

export const useRefresh = () => {
    return useContext(RefreshContext)
}
