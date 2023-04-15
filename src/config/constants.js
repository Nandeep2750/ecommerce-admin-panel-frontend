const MODULE_SLUG = Object.freeze({
    USER: "USER",
    PRODUCT:"PRODUCT",
});

const APP_ENV_TYPE = Object.freeze({
    LOCAL: 'local',
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
});


const ADMIN_CONFIG = Object.freeze({
    password: {
        min: 8,
        max: 20,
    }
});

module.exports = {
    MODULE_SLUG,
    APP_ENV_TYPE,
    API_BASEURL: process.env.REACT_APP_API_BASEURL,

    BREADCRUMB_SEPARATOR: ">",

    LOGIN_DATA: {
        name: "Nandeep Barochiya",
        email: "barochiya.barochiya@gmail.com",
        password: "Admin@123"
    },
    REDUX_LOCAL_STORE_KEY: 'quick-mart-data',
    ADMIN_CONFIG
}