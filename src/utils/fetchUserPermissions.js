// import { getToken } from 'next-auth/jwt'
// import { cookies } from 'next/headers'

export default async function fetchUserPermissions(token) {
    try {
        // const cookie = cookies()
        // const token = cookie.get('next-auth.session-token').value
        // const session = await getToken({
        //     req: { cookies: { 'next-auth.session-token': token } },
        //     secret: process.env.NEXTAUTH_SECRET,
        // })

        if (token) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}user/user_permissions/`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            const data = await res.json()
            return { user_permissions: data.user_permissions }
        }
    } catch (err) {
        console.error('Error fetching user permissions:', err)
        return { user_permissions: [] }
    }
}
