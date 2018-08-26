// Use variables to avoid future errors resulting from typos in Strings
const SET_USER_INFO = 'FIRST_TIME_OPEN_ACTION'

export { SET_USER_INFO }

export default userInfo => {
    return { type: SET_USER_INFO }
}
