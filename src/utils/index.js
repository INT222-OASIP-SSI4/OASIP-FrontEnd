export const saveToLocal = (token) => {
    return localStorage.setItem('token', `${token.jwttoken}`)
}