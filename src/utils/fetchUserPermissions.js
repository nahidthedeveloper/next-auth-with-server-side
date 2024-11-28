export default async function fetchUserPermissions(token) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/user/user_permissions/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Set the auth token here
                },
            }
        );

        const data = await res.json();
        return { user_permissions: data.user_permissions };
    } catch (err) {
        console.error('Error fetching user permissions:', err);
        return { user_permissions: [] };
    }
}
