import axios from "axios";
import { store } from "../redux/store/store";

import { userActions } from "../redux/actions/user.actions";
import { API_BASEURL } from "../config/constants";

import { getLocalAccessToken, getLocalRefreshToken } from "./LocalstorageHelper";
const instance = axios.create({
    baseURL: API_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});
instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        /* Refresh Token was expired */
        if (parseInt(res.status) === 203) {
            store.dispatch(userActions.logout());
        }
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/login" && err.response) {

            /* ------ Access Token was expired ------ */
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await instance.post("/cms/auth/refresh-token", {
                        refreshToken: getLocalRefreshToken(),
                        token: getLocalAccessToken()
                    });
                    const { data } = rs.data;
                    store.dispatch(userActions.editTokens(data));
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;