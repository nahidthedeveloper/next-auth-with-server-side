// Only for server Components
// Get cookie for this way
// const userPermissions = cookie('user_permissions');

export const cookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const setCookie = (name, value, options = {}) => {
    let cookieString = `${name}=${encodeURIComponent(value)}; path=/;`

    if (options.expires) {
        if (options.expires instanceof Date) {
            cookieString += `expires=${options.expires.toUTCString()};`
        } else {
            console.warn('The "expires" option must be a Date object')
        }
    }
    if (options.maxAge) {
        cookieString += `max-age=${options.maxAge};`
    }
    if (options.secure) {
        cookieString += `secure;`
    }
    if (options.sameSite) {
        cookieString += `sameSite=${options.sameSite};`
    }
    document.cookie = cookieString
}

export const removeCookie = (name) => {
    document.cookie = `${name}=; max-age=0; path=/;`
}


