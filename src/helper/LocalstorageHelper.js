import { REDUX_LOCAL_STORE_KEY } from "../config/constants";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(REDUX_LOCAL_STORE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("🚀 ~ file: LocalstorageHelper.js ~ line 11 ~ loadState ~ e", e)
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(REDUX_LOCAL_STORE_KEY, serializedState);
    } catch (e) {
        console.error("🚀 ~ file: LocalstorageHelper.js ~ line 21 ~ saveState ~ e", e)
        return undefined;
    }
};

export function getLocalRefreshToken() {
    const data = JSON.parse(localStorage.getItem(REDUX_LOCAL_STORE_KEY));
    return data?.authentication?.userData?.refreshToken;
};

export function getLocalAccessToken() {
    const data = JSON.parse(localStorage.getItem(REDUX_LOCAL_STORE_KEY));
    return data?.authentication?.userData?.token;
};