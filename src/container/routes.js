import React, { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FourZeroFour } from "../components/pages/Error/404";
import { LOCATIONS } from "../config/routeConfig";

/* Layouts */
import GuestLayout from "../layout/GuestLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import { OPERATIONS } from "../config/constants";

/* Pages */
const Login = lazy(() => import("../components/pages/Auth/Login"));
const Dashboard = lazy(() => import("../components/pages/Dashboard/Index"));
const Profile = lazy(() => import("../components/pages/Profile/Index"));
const ChangePassword = lazy(() => import("../components/pages/ChangePassword/Index"));

/* User */
const User = lazy(() => import("../components/pages/User/Index"));
const AddEditUser = lazy(() => import("../components/pages/User/AddEditUser"));

/* Category Module */
const Category = lazy(() => import("../components/pages/Category/Index"));

/* Product Module */
const Product = lazy(() => import("../components/pages/Product/Index"));
const AddEditProduct = lazy(() => import("../components/pages/Product/AddEditProduct"));
const ViewProduct = lazy(() => import("../components/pages/Product/ViewProduct"));

const routes = (loggedIn) => {

  return [
    {
      path: LOCATIONS.ROOT,
      element: !loggedIn ? <GuestLayout><Outlet /></GuestLayout> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE} />,
      children: [
        { path: LOCATIONS.LOGIN_ROUTE, element: <Login /> },
        { path: LOCATIONS.ROOT, element: <Navigate to={LOCATIONS.LOGIN_ROUTE} /> },
      ],
    },
    {
      path: LOCATIONS.ROOT,
      element: loggedIn ? <ProtectedLayout><Outlet /></ProtectedLayout> : <Navigate to={LOCATIONS.LOGIN_ROUTE} />,
      children: [
        { path: LOCATIONS.DASHBOARD_ROUTE, element: <Dashboard /> },
        {
          path: LOCATIONS.USER_ROUTE.ROOT,
          element: <Outlet />,
          children: [
            { path: LOCATIONS.USER_ROUTE.ROOT, element: <User />, },
            { path: LOCATIONS.USER_ROUTE.ADD, element: <AddEditUser operationType={OPERATIONS.ADD} /> },
            { path: LOCATIONS.USER_ROUTE.EDIT, element: <AddEditUser operationType={OPERATIONS.EDIT} /> },
          ]
        },
        {
          path: LOCATIONS.PRODUCT_ROUTE.ROOT,
          element: <Outlet />,
          children: [
            { path: LOCATIONS.PRODUCT_ROUTE.ROOT, element: <Product />, },
            { path: LOCATIONS.PRODUCT_ROUTE.ADD, element: <AddEditProduct operationType={OPERATIONS.ADD} /> },
            { path: LOCATIONS.PRODUCT_ROUTE.EDIT, element: <AddEditProduct operationType={OPERATIONS.EDIT} /> },
            { path: LOCATIONS.PRODUCT_ROUTE.VIEW, element: <ViewProduct operationType={OPERATIONS.VIEW} /> },
          ]
        },
        { path: LOCATIONS.CATEGORY_ROUTE.ROOT, element: <Category /> },
        { path: LOCATIONS.CHANGE_PASSWORD_ROUTE, element: <ChangePassword /> },
        { path: LOCATIONS.PROFILE_ROUTE, element: <Profile /> },
      ],
    },
    {
      path: LOCATIONS.ERROR_ROUTE[404],
      element: <FourZeroFour />
    },
  ];
};

export default routes;