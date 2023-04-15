const ROOT = '/';

const LOGIN_ROUTE = `/login`;
const DASHBOARD_ROUTE = `/dashboard`;
const PROFILE_ROUTE = '/profile';
const CHANGE_PASSWORD_ROUTE = '/change-password';

const ERROR_ROUTE = {
    404:'*',
}

export const LOCATIONS = Object.freeze({
    ROOT,
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    CHANGE_PASSWORD_ROUTE,
    ERROR_ROUTE
});