export const SET_USER = 'SET_USER'

export const set_user_action = user => {
    return {
        type: SET_USER,
        payload: user
    }
}