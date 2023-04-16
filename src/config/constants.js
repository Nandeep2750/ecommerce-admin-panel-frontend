const PAGINATION = Object.freeze({
    DEFAULT_PAGE_SIZE: 10,
    DEFAULT_PAGE_NO: 1
});

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

const LOGIN_DATA= {
    name: "Nandeep Barochiya",
    email: "barochiya.barochiya@gmail.com",
    password: "Admin@123"
}

const GENDER = Object.freeze({
    MALE: "Male",
    FEMALE: "Female"
});

const TOGGLE = Object.freeze({
    ACTIVE: {
        LABLE:"Active",
        VALUE:"ACTIVE"
    },
    INACTIVE: {
        LABLE:"Inactive",
        VALUE:"INACTIVE"
    },
});

const ADMIN_CONFIG = Object.freeze({
    password: {
        min: 8,
        max: 20,
    }
});

module.exports = {
    PAGINATION,
    MODULE_SLUG,
    APP_ENV_TYPE,
    API_BASEURL: process.env.REACT_APP_API_BASEURL,

    BREADCRUMB_SEPARATOR: ">",
    LOGIN_DATA,
    GENDER,
    
    REDUX_LOCAL_STORE_KEY: 'quick-mart-data',
    TOGGLE,
    ADMIN_CONFIG
}