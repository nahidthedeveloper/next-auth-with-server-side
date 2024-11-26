// Only for server Components
// Get cookie for this way
// const userPermissions = getCookie('user_permissions');

const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export default getCookie

