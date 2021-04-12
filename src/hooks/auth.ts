export const auth = () => {
    const user = localStorage.getItem('@user')
    if (!user)
        return false

    return true
}

export const signOut = () => {
    return localStorage.removeItem('@user');
}