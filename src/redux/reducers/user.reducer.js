import { AUTH_TYPES } from '../../config/actionTypes'

let initialState = {
    loggedIn: false,
    userData: null
}

export function authentication(state = initialState, action) {

    switch (action.type) {
        case AUTH_TYPES.LOGIN:
            return {
                loggedIn: true,
                userData: action.payload.userData
            };

        case AUTH_TYPES.EDIT:
            return {
                ...state,
                userData: {...state.userData , ...action.payload.userData}
            };

        case AUTH_TYPES.LOGOUT:
            return {
                ...initialState
            }

        default:
            return state
    }
}