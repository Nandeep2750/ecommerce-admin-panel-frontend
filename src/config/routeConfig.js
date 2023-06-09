const ROOT = '/';

const LOGIN_ROUTE = `/login`;
const SIGNUP_ROUTE = `/sign-up`;
const DASHBOARD_ROUTE = `/dashboard`;
const PROFILE_ROUTE = '/profile';
const CHANGE_PASSWORD_ROUTE = '/change-password';

const USER_ROUTE = {
    ROOT:'/user',
    ADD:'/user/add',
    EDIT:'/user/edit/:userId',
}

const CATEGORY_ROUTE = {
    ROOT:'/category',
}

const PRODUCT_ROUTE = {
    ROOT:'/product',
    ADD:'/product/add',
    EDIT:'/product/edit/:productId',
    VIEW:'/product/view/:productId'
}

const ORDER_ROUTE = {
    ROOT:'/order',
}

const ERROR_ROUTE = {
    404:'*',
}

export const LOCATIONS = Object.freeze({
    ROOT,
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    SIGNUP_ROUTE,
    PROFILE_ROUTE,
    CHANGE_PASSWORD_ROUTE,
    USER_ROUTE,
    CATEGORY_ROUTE,
    PRODUCT_ROUTE,
    ORDER_ROUTE,
    ERROR_ROUTE
});