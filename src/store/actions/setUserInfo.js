// Use variables to avoid future errors resulting from typos in Strings
const SET_USER_INFO = 'SET_USER_INFO'

export { SET_USER_INFO }

/**
 * userInfo : {
 *      email,
 *      name,
 *      id
 * }
 */
export default userInfo => {
    return { type: SET_USER_INFO, payload: userInfo }
}
